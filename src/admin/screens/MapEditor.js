import './MapEditor.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDoc, getFirestore, onSnapshot, query } from 'firebase/firestore';
import FormModal from '../components/FormModal';
import L from 'leaflet';
import MapComponent from '../../components/Map';
import config from '../../config';

const nodesMap = new Map();

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

  // Floor controls
  useEffect(() => {
    if (!map) {
      return null;
    }

    const floorControl = L.control({
      position: 'topleft'
    });
    floorControl.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'leaflet-bar floor-control');
      this._div.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

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
  }, [map]);

  // Click handler
  useEffect(() => {
    if (!map) {
      return null;
    }

    const clickHandler = e => {
      setSelectedNode({
        id: null,
        x: e.latlng.lng,
        y: e.latlng.lat
      });
      setFormModalOpen(true);
    };

    map.on('click', clickHandler);
    return () => {
      map.off('click', clickHandler);
    }
  }, [map]);

  // Firebase subscription
  useEffect(() => {
    if (!map) {
      return null;
    }

    const db = getFirestore();
    const q = query(collection(db, 'navigationNodes'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        const doc = change.doc;
        switch (change.type) {
          case 'added':
            const data = doc.data();
            const marker = L.marker([data.y, data.x], {
              docId: doc.id,
              icon: L.icon(config.icons[data.icon || 'default'])
            });
            marker.on('click', async e => {
              const docActual = await getDoc(doc.ref);
              setSelectedNode({
                id: docActual.id,
                ...docActual.data()
              });
              setFormModalOpen(true);
            });
            marker.addTo(map);
            nodesMap.set(doc.id, marker);
          break;

          case 'modified':
            if (nodesMap.has(doc.id)) {
              const marker = nodesMap.get(doc.id);
              const data = doc.data();
              marker?.setLatLng([data.y, data.x]);
              marker?.setIcon(L.icon(config.icons[data.icon || 'default']));
            }
          break;

          case 'removed':
            if (nodesMap.has(doc.id)) {
              const marker = nodesMap.get(doc.id);
              marker?.remove();
              nodesMap.delete(doc.id);
            }
          break;
        }
      });
    });

    return () => {
      unsubscribe?.();
    }
  }, [map]);

  return (
    <div className="map">
      <MapComponent
        editable={true}
        onMapInit={setMap}
      />
      {formModalOpen && (
        <FormModal
          onClose={() => {
            setFormModalOpen(false);
            setSelectedNode(null);
          }}
          selectedNode={selectedNode}
        />
      )}
    </div>
  );
}
