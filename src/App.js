import './App.scss';
import {
  BrowserRouter,
  Link,
  Route,
  Routes as Switch
} from "react-router-dom";
import React, { useEffect } from 'react';
import Admin from './admin';
import Departments from './admin/screens/Departments';
import Home from './Home';
import MapEditor from './admin/screens/MapEditor';
import config from './config';
import { initializeApp } from "firebase/app";

export default function() {
  useEffect(() => {
    // Initialize Firebase application
    initializeApp(config.firebase);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Admin />} path="/admin">
          <Route element={<Departments />} path="departments" />
          <Route element={<MapEditor />} path="map" />
        </Route>
        <Route element={<Home />} path="/" />
      </Switch>
    </BrowserRouter>
  );
}
