import './NavBar.scss';
import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { SessionContext } from '../contexts/Session';

export default function({ signInFunc }) {
  const { signOut, user, userDetails } = useContext(SessionContext);

  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar-item user-name">
          <Link to="/admin">
            <button>
              Home
            </button>
          </Link>
        </div>
        <div className="nav-bar-item user-name">
          <Link to="/admin/map">
            <button>
              Navigation Map
            </button>
          </Link>
        </div>
        <div className="nav-bar-item user-name">
          <Link to="/admin/departments">
            <button>
              Departments
            </button>
          </Link>
        </div>
        <div className="flex-grow"></div>
        {userDetails?.name && <div className="nav-bar-item user-name">
          {userDetails.name}
        </div>}
        {user && <button
          className="btn-sign-out"
          onClick={signOut}
          type="button"
        >
          Sign&nbsp;Out
        </button>}
      </div>
      <div className="nav-bar-instead"></div>
    </>
  );
}
