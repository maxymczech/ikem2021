import './Home.scss';
import React, { useState } from 'react';
import Map from './components/Map';

export default function() {
  const [map, setMap] = useState(null);

  console.log(map);

  return (
    <div className="home-wrap">
      <div className="sidebar"></div>
      <div className="map">
        <Map
          editable={false}
          onMapInit={setMap}
        />
      </div>
    </div>
  );
}
