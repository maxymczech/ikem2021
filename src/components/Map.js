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
    L.imageOverlay('/images/floors/floor-1.png', bounds).addTo(map);
    onMapInit?.(map);
  }, []);
  
  return <div className="map-container" id={id}></div>;
}
