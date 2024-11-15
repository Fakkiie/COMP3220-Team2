import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WardMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wardRequests, setWardRequests] = useState({});
  const [maxRequests, setMaxRequests] = useState(1); 

  //when our component renders it runs , fetches our geojson file and a query from our database
  //that allows us to fill out the opacity of the map as well as setting up the data in a way so 
  //our onclick function will work
  useEffect(() => {
    console.log("Fetching GeoJSON data...");
    fetch('/data/ward_boundaries.geojson')
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
        console.log("GeoJSON Data Loaded:", data);
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading GeoJSON:", err);
        setError(err);
        setLoading(false);
      });

    console.log("Fetching grouped ward data...");
    fetch('https://comp3220-team2.onrender.com/api/grouped')
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw grouped ward data:", data);

        const wardData = data.reduce((acc, item) => {
          const { ward, department, count } = item;
          const standardizedWard = `WARD ${ward.split(" ")[1]}`;
          if (!acc[standardizedWard]) acc[standardizedWard] = { totalRequests: 0, departments: {} };
          acc[standardizedWard].totalRequests += Number(count);
          acc[standardizedWard].departments[department] =
            (acc[standardizedWard].departments[department] || 0) + Number(count);
          return acc;
        }, {});

        const calculatedMaxRequests = Math.max(
          ...Object.values(wardData).map((ward) => ward.totalRequests),
          1 
        );
        setWardRequests(wardData);
        setMaxRequests(calculatedMaxRequests);
      })
      .catch((err) => {
        console.error("Error fetching grouped data:", err);
        setError(err);
      });
  }, []);

  if (loading || !geoData || !Object.keys(wardRequests).length) {
    return <div>Loading map...</div>;
  }

  //styles our ward and fills in the opacity with a scale around 0.2/0.8 
  //and returns the styles to our map
  const geoJSONStyle = (feature) => {
    const wardName = feature.properties["Name"];
    const standardizedWardName = `WARD ${wardName.split(" ")[1] || wardName}`;
    const wardData = wardRequests[standardizedWardName] || { totalRequests: 0 };

    const totalRequests = wardData.totalRequests;

    const fillOpacity = totalRequests > 0
      ? 0.2 + (0.6 * totalRequests) / maxRequests 
      : 0.2;

    return {
      color: "blue",
      weight: 2,
      opacity: 1,
      fillOpacity: Math.min(fillOpacity, 0.8),
    };
  };

  //our onclick function that will display the data of the ward when clicked,
  //it pops up a box displaying the amount of requests made to a department in that specific ward
  //need to try and make it work with requests but it only wants department for some reason even if my 
  //query only has ward, reqeust, unsure tbh
  const onEachFeature = (feature, layer) => {
    const wardName = feature.properties["Name"];
    const standardizedWardName = `WARD ${wardName.split(" ")[1] || wardName}`;
    const wardData = wardRequests[standardizedWardName] || { departments: {} };

    layer.on('click', () => {
      const popupContent = `
        <div class="max-h-32 overflow-y-auto p-2">
          <strong>${standardizedWardName}</strong><br />
          ${
            Object.entries(wardData.departments).length > 0
              ? Object.entries(wardData.departments)
                  .map(([department, count]) => `<strong>${department || "UNKNOWN"}:</strong> ${count}`)
                  .join('<br />')
              : "No requests available"
          }
        </div>`;
      layer.bindPopup(popupContent).openPopup();
    });
  };

  //what our component returns, the map and the specifics of it like the min max zoom, also renders our geojson and all our main functions
  //also key allows us to force a re-render of our component so we can have the onlcick work, if it isnt there our onclick is messed up
  return (
    <MapContainer
      center={[42.317432, -83.026772]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={true}
      minZoom={10}
      maxZoom={18}
      maxBounds={[[42.1, -83.2], [42.5, -82.8]]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={JSON.stringify(wardRequests)}
        data={geoData}
        style={(feature) => geoJSONStyle(feature)}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default WardMap;
