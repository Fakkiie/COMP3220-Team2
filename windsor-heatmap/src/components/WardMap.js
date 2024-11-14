import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WardMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wardRequests, setWardRequests] = useState({});
  const [maxRequests, setMaxRequests] = useState(0);

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
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

    // Fetch service requests data
    fetch('https://comp3220-team2.onrender.com/api/grouped')
      .then(response => response.json())
      .then(data => {
        console.log("API Response Data:", data);

        const wardData = data.reduce((acc, item) => {
          const { ward, request, count } = item;
          const standardizedWard = `WARD ${ward.split(" ")[1]}`;

          if (!acc[standardizedWard]) acc[standardizedWard] = {};
          acc[standardizedWard][request] = Number(count) || 0;

          setMaxRequests(prevMax => Math.max(prevMax, Number(count) || 0));
          return acc;
        }, {});

        console.log("Processed Ward Data with Requests:", wardData);
        setWardRequests(wardData);
      })
      .catch(err => {
        console.error("Error fetching service requests:", err);
        setError(err);
      });
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
    const standardizedWardName = `WARD ${wardName.split(" ")[1] || wardName}`;
    const wardData = wardRequests[standardizedWardName] || {};

    const totalRequests = Object.values(wardData).reduce((acc, count) => acc + count, 0);
    const fillOpacity = totalRequests > 0 ? Math.min(0.2 + 0.8 * (totalRequests / maxRequests), 1) : 0.2;

    console.log(`Total Requests for ${standardizedWardName}: ${totalRequests} | Opacity: ${fillOpacity}`);
    
    return {
      color: "blue",
      weight: 2,
      opacity: 1,
      fillOpacity: fillOpacity,
    };
  };

  const fetchPopupData = async (wardName) => {
    try {
      const response = await fetch(`https://comp3220-team2.onrender.com/api/ward/${wardName}`);
      const data = await response.json();
      console.log(`Popup Data for ${wardName}:`, data); // Confirm the structure here
      return data;
    } catch (error) {
      console.error("Error fetching ward data:", error);
      return {};
    }
  };

  const onEachFeature = (feature, layer) => {
    const wardName = feature.properties["Name"];
    const standardizedWardName = `WARD ${wardName.split(" ")[1] || wardName}`;
    const wardData = wardRequests[standardizedWardName] || {};

    layer.on('click', () => {
      const popupContent = `
        <div class="max-h-32 overflow-y-auto p-2">
          <strong>${standardizedWardName}</strong><br />
          ${Object.entries(wardData)
            .map(([request, count]) => `${request}: ${count}`)
            .join('<br />') || "No requests available"}
        </div>`;
      
      layer.bindPopup(popupContent).openPopup();
    });
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
