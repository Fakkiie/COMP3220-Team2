import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WardMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestCounts, setRequestCounts] = useState({});
  const [wardRequests, setWardRequests] = useState({});

  useEffect(() => {
    console.log("Starting WardMap component");
    document.body.style.overflow = 'hidden';

    // Fetch GeoJSON Data
    fetch('/data/ward_boundaries.geojson')
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        console.log("Fetched GeoJSON data:", data);
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading GeoJSON:", err);
        setError(err);
        setLoading(false);
      });

    // Fetch grouped data from the backend
    fetch('https://comp3220-team2.onrender.com/api/grouped')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched grouped requests data:", data);

        // Convert data to a more accessible format
        const counts = {};
        data.forEach(({ ward, department, count }) => {
          if (!counts[ward]) counts[ward] = {};
          counts[ward][department] = count;
        });
        setRequestCounts(counts);
      })
      .catch(err => {
        console.error("Error fetching grouped requests:", err);
        setError(err);
      });

    // Fetch all service requests data
    fetch('https://comp3220-team2.onrender.com/api/service')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched service requests data:", data);

        // Process ward data for easier lookup
        const wardData = data.reduce((acc, item) => {
          if (!acc[item.ward]) acc[item.ward] = {};
          acc[item.ward][item.department] = (acc[item.ward][item.department] || 0) + 1;
          return acc;
        }, {});
        setWardRequests(wardData);
      })
      .catch(err => {
        console.error("Error fetching ward requests:", err);
        setError(err);
      });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Styling function to adjust opacity based on request count
  const geoJSONStyle = (feature) => {
    const wardName = feature.properties["Name"];
    const wardData = requestCounts[wardName] || {};
    const totalRequests = Object.values(wardData).reduce((acc, count) => acc + parseInt(count), 0);
    const maxRequests = Math.max(...Object.values(requestCounts).map(data => Object.values(data).reduce((a, b) => a + parseInt(b), 0)), 1);
    const fillOpacity = totalRequests > 0 ? 0.2 + 0.8 * (totalRequests / maxRequests) : 0.2;

    return {
      color: "blue",
      weight: 2,
      opacity: 1,
      fillOpacity: fillOpacity
    };
  };

  const onEachFeature = (feature, layer) => {
    const wardName = feature.properties["Name"];
    const wardData = wardRequests[wardName] || {};
  
    const popupContent = `
      <div class="max-h-32 overflow-y-auto p-2">
        <strong>${wardName}</strong><br />
        ${Object.entries(wardData)
          .map(([department, count]) => `${department}: ${count}`)
          .join('<br />') || "No requests available"}
      </div>`;
  
    layer.bindPopup(popupContent);
    layer.on('click', () => layer.openPopup());
  };
  
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
      {geoData && (
        <GeoJSON
          data={geoData}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default WardMap;
