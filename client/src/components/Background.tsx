import React from "react";
import "./Background.css";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export interface IBackgroundProps {}

const Background: React.FunctionComponent<IBackgroundProps> = (props) => {
  return (
    <div className="Background">
      <Outlet />
    </div>
  );
};

export default Background;
