import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WardMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //makes sure our geo json is ok
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

//style of the wards
  const geoJSONStyle = {
    color: "blue",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.4
  };

  //makeshift oncick to get ward feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties["Ward Number"]) {
      layer.bindPopup(`Ward: ${feature.properties["Ward Number"]}`);
    }
  };

  //container for the map and functions to call
  return (
    <MapContainer
      center={[42.317432, -83.026772]}
      zoom={12}
      style={{ height: '100%', width: '100%' }} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
