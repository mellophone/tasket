import React from "react";
import { Outlet } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <div className="Login">
      <div className="Login-Block">
        <p className="Login-Title">Login</p>
        <div className="Login-Credentials">
          <input className="Login-Username" type="text" />
          <br />
          <input className="Login-Password" type="password" />
        </div>
      </div>
    </div>
  );
};

export default Login;
