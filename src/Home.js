import './Home.scss';
import React, { useCallback, useState } from 'react';
import L from 'leaflet';
import Map from './components/Map';
import config from './config';

export default function() {
  const [map, setMap] = useState(null);
  const [lang, setLang] = useState('cz');
  const [locationFrom, setLocationFrom] = useState('Hlavní vchod');
  const [locationTo, setLocationTo] = useState('Místnost D2006');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [wheelchairEnabled, setWheelchairEnabled] = useState(true);

  const setFloor = useCallback((e, n) => {
    e?.preventDefault?.();
    const targetLayerName = `floor-${n}`;
    map?.eachLayer(layer => {
      if (layer?.options?.layerName === targetLayerName) {
        layer.bringToFront();
      }
    });
  }, [map]);

  const startAnimation = useCallback(e => {
    e.preventDefault();

    // Create marker
    const marker = L.marker([856, 3636], {
      icon: L.icon(config.icons['ikemka-1'])
    });
    marker.addTo(map);

    // Create polyline 1
    const polyline1 = L.polyline([
      [856, 3636],
      [2708, 3636],
      [2708, 1780]
    ], {
      color: '#ff0000',
    });

    // Create polyline 2
    const polyline2 = L.polyline([
      [2708, 1780],
      [2708, 2820]
    ], {
      color: '#ff0000',
    });

    let start = null;
    let floorFlip = false;
    const anim = (timestamp) => {
      if (!start) {
        start = timestamp;
      } else {
        const dt = timestamp - start;
        const t1 = 4000;
        const t2 = 8000;
        const t3 = 10000;
        const t4 = 13000;
        if (dt < t1) {
          const c = [856 + dt / t1 * (2708 - 856), 3636];
          marker.setLatLng(c);
          map.panTo(c);
        } else if (dt < t2) {
          const c = [2708, 3636 - (3636 - 1780) * (dt - t1) / (t2 - t1)];
          marker.setLatLng(c);
          map.panTo(c);
        } else {
          if (!floorFlip) {
            floorFlip = true;
            setFloor(null, 2);
            polyline1.remove();
            polyline2.addTo(map);
          }
          if (dt > t3 && dt < t4) {
            const c = [2708, 1780 + (2820 - 1780) * (dt - t3) / (t4 - t3)];
            marker.setLatLng(c);
            map.panTo(c);
          }
        }
      }

      requestAnimationFrame(anim);
    };

    anim();
    polyline1.addTo(map);

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
          <form onSubmit={startAnimation}>
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
