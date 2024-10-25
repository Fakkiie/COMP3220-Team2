import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


//main component to display the map
const WardMap = () => {
  //states to hold geojson data, loading status, and any errors
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //once component is ok, fetch the geojson data, if its good it'll set the data with .then and if not handle error catches it
  useEffect(() => {
    fetch('/data/ward_boundaries.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load GeoJSON file: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  //Debug tools 
  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!geoData) {
    return <div>Error: No data available</div>;
  }

  //style of the wards for how we see it
  const geoJSONStyle = {
    color: "blue",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.4
  };

  //makeshift oncick to get ward number
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties["Ward Number"]) {
      layer.bindPopup(`Ward: ${feature.properties["Ward Number"]}`);
    }
  };

  //main return of the component that renders the map
  return (
    //sets our zoom level and center of map, as well as max zoom and border so they cant scroll away
    <MapContainer
    center={[42.317432, -83.026772]}
    zoom={12}
    style={{ height: '94.3vh', width: '100%' }}  
    scrollWheelZoom={true}
    minZoom={10} 
    maxZoom={18}  
    maxBounds={[[42.1, -83.2], [42.5, -82.8]]} //may need to play around with this for user experience
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Displays the geojson data on the map if it loads */}
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
