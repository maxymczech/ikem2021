import 'leaflet/dist/leaflet.css';
import './Map.scss';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';

export default function({
  editable = false,
  onMapInit = () => {}
}) {
  const [id, setId] = useState(uuidv4);

  useEffect(() => {
    const map = L.map(id, {
      crs: L.CRS.Simple,
      maxZoom: 2,
      minZoom: -3
    });

    const bounds = [
      [0,0],
      [config.floorImageSize.height, config.floorImageSize.width]
    ];

    map.setMaxBounds(bounds);
    map.setView([0, config.floorImageSize.width / 2], -1);

    // Add floor images as layers
    for (let i = config.floorCount; i >= 1; i--) {
      L.imageOverlay(`/images/floors/floor-${i}.png`, bounds, { layerName: `floor-${i}` }).addTo(map);
    }

    // Forward leaflet map reference outside of component
    onMapInit?.(map);
  }, []);
  
  return <div className="map-container" id={id}></div>;
}
