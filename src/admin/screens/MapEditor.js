import './MapEditor.scss';
import React, { useCallback, useEffect, useState } from 'react';
import FormModal from '../components/FormModal';
import L from 'leaflet';
import MapComponent from '../../components/Map';
import config from '../../config';

export default function() {
  const [map, setMap] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(1);

  const [selectedNode, setSelectedNode] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  useEffect(() => {
    const targetLayerName = `floor-${currentFloor}`;
    map?.eachLayer(layer => {
      if (layer?.options?.layerName === targetLayerName) {
        layer.bringToFront();
      }
    });
  }, [currentFloor, map]);

  useEffect(() => {
    if (!map) {
      return null;
    }

    // Floor controls
    const floorControl = L.control({
      position: 'topleft'
    });
    floorControl.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'leaflet-bar floor-control');
      this._div.addEventListener('click', e => {
        e.preventDefault();

        const linkElement = e.target;
        const floor = Number(linkElement?.getAttribute?.('data-floor'));
        if (floor) {
          setCurrentFloor(
            Number(e.target?.getAttribute?.('data-floor'))
          );
        }
        if (linkElement) {
          linkElement.parentNode.querySelectorAll('a').forEach(childLink => {
            childLink.classList.remove('active');
          });
          linkElement.classList.add('active');
        }
      });
      this.update();
      return this._div;
    };
    floorControl.update = function() {
      let str = '';
      for (let i = 1; i <= config.floorCount; i++) {
        str += `
          <a
            class="${i === currentFloor ? 'active' : ''}"
            data-floor="${i}"
            href="#"
          >
            ${i}
          </a>
        `;
      }
      this._div.innerHTML = str;
    };
    floorControl.addTo(map);

    // Click handler
    map.on('click', e => {
      setSelectedNode({
        id: null,
        x: e.latlng.lng,
        y: e.latlng.lat
      });
      setFormModalOpen(true);
    });
  }, [map]);

  return (
    <div className="map">
      <MapComponent
        editable={true}
        onMapInit={setMap}
      />
      {formModalOpen && (
        <FormModal
          onClose={() => setFormModalOpen(false)}
          selectedNode={selectedNode}
        />
      )}
    </div>
  );
}
