"use client";

import NavLogo from "./NavLogo";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  const extractPageName = (location: Location) => {
    const p = location.pathname;
    return `${p.substring(1, 2).toUpperCase()}${p.substring(2)}`;
  };

  const currentPageState = useState("");
  const [, setCurrentPage] = currentPageState;

  useEffect(() => {
    const initialPage = extractPageName(window.location);
    setCurrentPage(initialPage);
  }, [setCurrentPage]);

  return (
    <div className="nav-bar-area">
      <div className="nav-bar">
        <NavLogo />
        <NavLink page="Home" currentPageState={currentPageState} />
        <NavLink page="Events" currentPageState={currentPageState} />
        <NavLink page="Assignments" currentPageState={currentPageState} />
        <NavLink page="Planner" currentPageState={currentPageState} />
        <NavLink page="Settings" currentPageState={currentPageState} />
      </div>
      <hr />
    </div>
  );
};

export default NavBar;
