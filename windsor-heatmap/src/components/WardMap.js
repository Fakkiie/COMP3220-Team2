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
    fetch('/data/ward_boundaries.geojson')
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

    fetch('/data/groupedRequests.json')
      .then(response => response.json())
      .then(data => {
        const counts = {};
        Object.values(data).forEach(requestList => {
          requestList.forEach(request => {
            const ward = request.Ward;
            counts[ward] = (counts[ward] || 0) + 1;
          });
        });
        setRequestCounts(counts);
      })
      .catch(err => setError(err));

    fetch('/data/groupedRequestsByWard.json')
      .then(response => response.json())
      .then(data => setWardRequests(data))
      .catch(err => setError(err));
  }, []);

  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const geoJSONStyle = (feature) => {
    const wardName = feature.properties["Name"];
    const totalRequests = requestCounts[wardName] || 0;
    const maxRequests = Math.max(...Object.values(requestCounts), 1);
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

    const popupContent = `<div class="max-h-32 overflow-y-auto p-2">` +
      `<strong>${wardName}</strong><br />` +
      (Object.keys(wardData).length > 0
        ? Object.entries(wardData).map(([type, count]) => `${type}: ${count}`).join('<br />')
        : "No requests available") +
      `</div>`;

    layer.bindPopup(popupContent);

    layer.on('click', () => {
      layer.openPopup();
    });
  };

  return (
    <MapContainer
      center={[42.317432, -83.026772]}
      zoom={12}
      style={{ height: '94.3vh', width: '100%' }}
      scrollWheelZoom={true}
      minZoom={10}
      maxZoom={18}
      maxBounds={[[42.1, -83.2], [42.5, -82.8]]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
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
