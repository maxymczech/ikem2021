import './Home.scss';
import React, { useCallback, useState } from 'react';
import Map from './components/Map';

export default function() {
  const [map, setMap] = useState(null);

  const setFloor = useCallback((n) => {
    const targetLayerName = `floor-${n}`;
    map?.eachLayer(layer => {
      if (layer?.options?.layerName === targetLayerName) {
        layer.bringToFront();
      }
    });
  }, [map]);

  return (
    <div className="home-wrap">
      <div className="sidebar">
        Sidebar Content

        <div>
          <button onClick={() => setFloor(1)}>Floor 1</button>
          <button onClick={() => setFloor(2)}>Floor 2</button>
          <button onClick={() => setFloor(3)}>Floor 3</button>
          <button onClick={() => setFloor(4)}>Floor 4</button>
          <button onClick={() => setFloor(5)}>Floor 5</button>
        </div>
      </div>
      <div className="map">
        <Map
          editable={false}
          onMapInit={setMap}
        />
      </div>
    </div>
  );
}
