import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WardMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wardRequests, setWardRequests] = useState({});

  useEffect(() => {
    console.log("Starting WardMap component");
    document.body.style.overflow = 'hidden';

    // Fetch GeoJSON Data
    fetch('/data/ward_boundaries.geojson')
      .then(response => {
        console.log("GeoJSON response status:", response.status);
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

    // Fetch service requests data
    fetch('https://comp3220-team2.onrender.com/api/service')
      .then(response => {
        console.log("Service API response status:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("Fetched service requests data:", data);

        // Organize data by ward
        const wardData = data.reduce((acc, item) => {
          if (!acc[item.ward]) acc[item.ward] = {};
          acc[item.ward][item.department] = (acc[item.ward][item.department] || 0) + 1;
          return acc;
        }, {});
        console.log("Processed ward data:", wardData);
        setWardRequests(wardData);
      })
      .catch(err => {
        console.error("Error fetching service requests:", err);
        setError(err);
      });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) {
    console.log("Loading map data...");
    return <div>Loading map...</div>;
  }

  if (error) {
    console.error("Map error:", error);
    return <div>Error: {error.message}</div>;
  }

  const geoJSONStyle = (feature) => {
    const wardName = feature.properties["Name"];
    const wardData = wardRequests[wardName] || {};
    const totalRequests = Object.values(wardData).reduce((acc, count) => acc + count, 0);
    const fillOpacity = totalRequests > 0 ? 0.2 + 0.8 * (totalRequests / 500) : 0.2;

    console.log(`Styling ward ${wardName} with ${totalRequests} requests (opacity: ${fillOpacity})`);
    
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

    console.log(`Adding popup for ward ${wardName}:`, wardData);

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
