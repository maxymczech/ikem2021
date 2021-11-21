import './Home.scss';
import React, { useCallback, useState } from 'react';
import Map from './components/Map';

export default function() {
  const [map, setMap] = useState(null);
  const [lang, setLang] = useState('en');
  const [locationFrom, setLocationFrom] = useState('');
  const [locationTo, setLocationTo] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [wheelchairEnabled, setWheelchairEnabled] = useState(true);

  const setFloor = useCallback((e, n) => {
    e.preventDefault();
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
          <select
            className="lang"
            onChange={e => setLang(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="cz">CZ</option>
          </select>
          <img src="/images/icons/ikem.png" className="logo"/>
          <img src="/images/icons/pin_2.png" className="ikemka"/>
        </div>

        <div className="search-form">
          <form>
            <div className="form-line">
              <label htmlFor="from_p">
                {lang === 'en' ? 'From' : 'Odkud'}:
              </label>
              <input
                id="from_p"
                onChange={e => setLocationFrom(e.target.value)}
                placeholder={lang === 'en' ? 'From' : 'Odkud'}
                type="text"
                value={locationFrom}
              />
            </div>
            <div className="form-line">
              <label htmlFor="to_p">
                {lang === 'en' ? 'To' : 'Kam'}:
              </label>
              <input
                id="to_p"
                onChange={e => setLocationTo(e.target.value)}
                placeholder={lang === 'en' ? 'To' : 'Kam'}
                type="text"
                value={locationTo}
              />
            </div>
            <div className="for-buttons">
              <div className="button-box">
                <button
                  className={'voiced ' + (voiceEnabled ? 'active' : '')}
                  onClick={() => setVoiceEnabled(x => !x)}
                  type="button"
                >
                  {lang === 'en' ? 'Voice assistant' : 'Hlasový asistent'}
                </button>
              </div>
              <div className="button-box">
                <button
                  className={'for-wheelchair ' + (wheelchairEnabled ? 'active' : '')}
                  onClick={() => setWheelchairEnabled(x => !x)}
                  type="button"
                >
                  {lang === 'en' ? 'Wheelchair accessible' : 'Bezbariérový přístup'}
                </button>
              </div>
            </div>
            <div className="button-box">
              <input
                type="submit"
                value={lang === 'en' ? 'Search' : 'Vyhledávat'}
              />
            </div>
          </form>
        </div>
        <div className="image-wrap">
          <img src="/images/buildings.png" className="whole-building"/>
          <a className="floor-1" href="/" onClick={e => setFloor(e, 1)}></a>
          <a className="floor-2" href="/" onClick={e => setFloor(e, 2)}></a>
          <a className="floor-3" href="/" onClick={e => setFloor(e, 3)}></a>
          <a className="floor-4" href="/" onClick={e => setFloor(e, 4)}></a>
          <a className="floor-5" href="/" onClick={e => setFloor(e, 5)}></a>
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
