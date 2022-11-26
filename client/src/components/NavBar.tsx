import React, { useEffect, useState } from "react";
import NavButton from "./NavButton";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./NavBar.css";
import DBService from "../DBService";
import Home from "../pages/Home";

export interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  // const navigate = useNavigate();
  // const auth = async () => {
  //   const authorized = await DBService.isSignedIn();
  //   if (!authorized) {
  //     navigate("/login");
  //   }
  // };
  // auth();

  let location = `${window.location.href}`;
  const endpt =
    location
      .substring(location.lastIndexOf("/") + 1, location.lastIndexOf("/") + 2)
      .toUpperCase() + location.substring(location.lastIndexOf("/") + 2);
  const [title, setTitle] = useState<string>(endpt);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const auth = async () => {
    const authorized = await DBService.isSignedIn();
    if (!authorized) {
      setAuthorized(false);
    }
  };
  auth();

  const tang = (): JSX.Element => {
    if (!authorized) {
      return <Navigate replace to="/login" />;
    }
    return (
      <div>
        <div className="NavBar">
          <div className="NavBar-Left">
            <NavButton
              dest="settings"
              onClick={() => {
                setTitle("Settings");
              }}
            />
            <NavButton
              dest="home"
              onClick={() => {
                setTitle("Home");
              }}
            />
            <NavButton
              dest="timeline"
              onClick={() => {
                setTitle("Timeline");
              }}
            />
          </div>
          <div className="NavBar-Centered">
            <span className="NavBar-Title">{title}</span>
          </div>
        </div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Home />} />
          <Route path="timeline" />
          <Route path="" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    );
  };
  return (
    <Routes>
      <Route path="/*" element={tang()}></Route>
    </Routes>
  );
};

export default NavBar;
