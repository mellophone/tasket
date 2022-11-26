import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import Background from "./components/Background";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import DBService from "./DBService";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Background />}>
          <Route element={<NavBar />}>
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Home />} />
            <Route path="timeline" element={<Home />} />
            <Route path="" element={<Navigate replace to="/home" />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
