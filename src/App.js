import './App.scss';
import {
  BrowserRouter,
  Link,
  Route,
  Routes as Switch
} from "react-router-dom";
import Admin from './admin';
import Home from './Home';
import React from 'react';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Admin />} path="/admin" />
        <Route element={<Home />} path="/" />
      </Switch>
    </BrowserRouter>
  );
}
