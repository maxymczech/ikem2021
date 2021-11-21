import './FormModal.scss';
import React, { useCallback, useContext, useState } from 'react';
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"; 
import config from '../../config';
import { createPortal } from 'react-dom';

export default function({
  onClose,
  selectedNode
}) {
  const [building, setBuilding] = useState(selectedNode?.building ?? config.buildings[0]);
  const [floor, setFloor] = useState(selectedNode?.floor ?? '1');
  const [icon, setIcon] = useState(selectedNode?.icon ?? '');
  const [isEnabled, setIsEnabled] = useState(selectedNode?.isEnabled ?? true);
  const [name_cz, setName_cz] = useState(selectedNode?.name_cz ?? '');
  const [name_en, setName_en] = useState(selectedNode?.name_en ?? '');
  const [nodeType, setNodeType] = useState(selectedNode?.nodeType ?? config.nodeTypes[0]);
  const [roomNumber, setRoomNumber] = useState(selectedNode?.roomNumber ?? '');
  const [wheelchair, setWheelchair] = useState(selectedNode?.wheelchair ?? true);
  const [x, setX] = useState(selectedNode?.x ?? '0');
  const [y, setY] = useState(selectedNode?.y ?? '0');

  const [isLoading, setIsLoading] = useState(false);
  const targetNode = document.querySelector('body');

  const savePoint = useCallback(async (e) => {
    e?.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const db = getFirestore();
    const payload = {
      building,
      floor,
      icon,
      isEnabled,
      name_cz,
      name_en,
      nodeType,
      roomNumber,
      x,
      y,
      wheelchair
    };

    if (selectedNode?.id) {
    } else {
      try {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, "navigationNodes"), payload);
        onClose?.(payload);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, [building, floor, icon, isEnabled, isLoading, name_cz, name_en, nodeType, roomNumber, wheelchair, x, y]);

  return (
    targetNode ? createPortal(
      <>
        <div
          className="modal-backdrop"
          onClick={() => onClose?.(null)}
        ></div>
        <div className="modal">
          <h2>Edit Node</h2>
          <button
            className="btn-close"
            onClick={() => onClose?.(null)}
          >
            X
          </button>
          <form onSubmit={savePoint}>
            <div className="form-row">
              <label htmlFor="point-x">X:</label>
              <input
                id="point-x"
                onChange={e => setX(e.target.value)}
                type="text"
                value={x}
              />
              <label htmlFor="point-y">Y:</label>
              <input
                id="point-y"
                onChange={e => setY(e.target.value)}
                type="text"
                value={y}
              />
            </div>
            <div className="form-row">
              <label htmlFor="node-type">Node Type:</label>
              <select
                id="point-floor"
                onChange={e => setNodeType(e.target.value)}
                value={nodeType}
              >
                {config.nodeTypes.map(id => (
                  <option
                    key={id}
                    value={id}
                  >
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="point-building">Building:</label>
              <select
                id="point-building"
                onChange={e => setBuilding(e.target.value)}
                value={building}
              >
                {config.buildings.map(id => (
                  <option
                    key={id}
                    value={id}
                  >
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="point-floor">Floor:</label>
              <select
                id="point-floor"
                onChange={e => setFloor(e.target.value)}
                value={building}
              >
                {Array.from(Array(config.floorCount).keys()).map(id => (
                  <option
                    key={id + 1}
                    value={id + 1}
                  >
                    {id + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="point-icon">Icon:</label>
              <input
                id="point-icon"
                onChange={e => setIcon(e.target.value)}
                type="text"
                value={icon}
              />
            </div>
            <div className="form-row">
              <label htmlFor="point-room-number">Room No:</label>
              <input
                id="point-room-number"
                onChange={e => setRoomNumber(e.target.value)}
                type="text"
                value={roomNumber}
              />
            </div>
            <div className="form-row">
              <label htmlFor="point-name-cz">Name (cz):</label>
              <input
                id="point-name-cz"
                onChange={e => setName_cz(e.target.value)}
                type="text"
                value={name_cz}
              />
              <label htmlFor="point-name-en">Name (en):</label>
              <input
                id="point-name_en"
                onChange={e => setName_en(e.target.value)}
                type="text"
                value={name_en}
              />
            </div>
            <div className="form-row">
              <label>&nbsp;</label>
              <label className="checkbox-label">
                <input
                  checked={isEnabled}
                  onChange={e => setIsEnabled(e.target.checked)}
                  type="checkbox"
                />
                <span>Node is enabled</span>
              </label>
            </div>
            <div className="form-row">
              <label>&nbsp;</label>
              <label className="checkbox-label">
                <input
                  checked={wheelchair}
                  onChange={e => setWheelchair(e.target.checked)}
                  type="checkbox"
                />
                <span>Wheelchair access</span>
              </label>
            </div>
            <div className="text-right">
              <button
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </>, targetNode
    ) : null
 );
}
