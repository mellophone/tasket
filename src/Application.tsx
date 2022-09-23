import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Background from "./components/Background";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Background />}>
          <Route path="/" element={<NavBar />}>
            <Route path="home" element={<Home />} />
            <Route path="settings" />
            <Route path="timeline" />
          </Route>
          <Route path="login" />
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
