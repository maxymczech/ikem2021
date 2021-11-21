import './Main.scss';
import Departments from './Departments';
import NavBar from '../components/NavBar';
import { Outlet } from "react-router-dom";
import React from 'react';

export default function() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
