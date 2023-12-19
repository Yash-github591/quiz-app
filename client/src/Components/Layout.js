import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

// layout component that wraps around all of our pages and components
// outlet is where the content of the page will go (i.e. Home, Login, Register, etc.)
// outlet is necessary for nested routes to work properly (i.e. Home, AddProblem, etc.)
// if we didn't have outlet, the content of the page would not show up

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
