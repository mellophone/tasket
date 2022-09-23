import React from "react";
import NavButton from "./NavButton";
import { Outlet } from "react-router-dom";
import "./NavBar.css";

export interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const title = "Home";
  return (
    <div>
      <div className="NavBar">
        <div className="NavBar-Left">
          <NavButton dest="settings" />
          <NavButton dest="home" />
          <NavButton dest="timeline" />
        </div>
        <div className="NavBar-Centered">
          <span className="NavBar-Title">{title}</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
