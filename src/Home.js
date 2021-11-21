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
        <div className="header">
          <select name="lang" className="lang">
            <option value="en">EN</option>
            <option value="cz">CZ</option>
          </select>
          <img src="/images/icons/ikem.png" className="logo"/>
          <img src="/images/icons/pin_2.png" className="ikemka"/>
        </div>

        <div className="search-form">
          <form>
            <div className="form-line">
              <label htmlFor="from_p">From:</label>
              <input type="text" id="from_p" placeholder="From" required="required" />
            </div>
            <div className="form-line">
              <label htmlFor="to_p">To:</label>
              <input type="text" id="to_p" placeholder="To" required="required" />
            </div>
            <div className="for-buttons">
              <div className="button-box">
                <button className="voiced">Voice directions</button>
              </div>
              <div className="button-box">
                <button className="for-wheelchair">Wheelchair accessible</button>
              </div>
            </div>
            <div className="button-box">
              <input type="submit" value="Search" />
            </div>
          </form>
        </div>
        <div className="image-wrap">
          <img src="/images/buildings.png" className="whole-building"/>
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
