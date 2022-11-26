import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  redirect,
  Router,
  useNavigate,
} from "react-router-dom";
import Button from "../components/Button";
import "./Login.css";

export interface ILoginProps {}

const ben = async () => {
  const response = await fetch(`http://localhost:5000/users`);
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const records = await response.json();
  console.log(records);
};

const benPost = async () => {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "your mom",
    }),
  });

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const records = await response.json();
  console.log(records);
};

const signUp = async () => {
  const username = document.getElementsByClassName(
    "Login-Username"
  )[0] as HTMLInputElement;
  const password = document.getElementsByClassName(
    "Login-Password"
  )[0] as HTMLInputElement;

  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: username.value,
      password: password.value,
    }),
  });
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  console.log(records);
};

const stop = () => {
  let name = document.getElementsByClassName(
    "Login-Username"
  )[0] as HTMLInputElement;

  name.value = name.value.toLowerCase();

  while (name.value.indexOf(" ") >= 0) {
    name.value =
      name.value.substring(0, name.value.indexOf(" ")) +
      name.value.substring(name.value.indexOf(" ") + 1);
  }
  while (name.value.length > 21) {
    name.value = name.value.substr(0, 21);
  }
};

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const navigate = useNavigate();
  const setError = (error: string) => {
    const errorDiv = document.getElementsByClassName("Login-Error")[0];
    // errorDiv
    errorDiv.innerHTML = error;
  };

  const login = async () => {
    setError("");
    const username = document.getElementsByClassName(
      "Login-Username"
    )[0] as HTMLInputElement;
    const password = document.getElementsByClassName(
      "Login-Password"
    )[0] as HTMLInputElement;

    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      setError("Email and password do not match!");
      return;
    }
    const token = await response.json();
    sessionStorage.setItem("token", token);
    console.log(`Token: "${token}"`);
    navigate("/");
  };
  return (
    <div className="Login">
      <div className="Login-Block">
        <p className="Login-Title">Sign In</p>
        <br />
        <div className="Login-Credentials">
          <input
            className="Login-Username"
            type="text"
            placeholder="Email"
            onInput={stop}
            spellCheck="false"
          />
          <br />
          <input
            className="Login-Password"
            type="password"
            placeholder="Password"
            onKeyDown={(key) => {
              if (key.key === "Enter") {
                login();
              }
            }}
          />
          <div className="Login-Error"></div>
          {/* <br /> */}
          <Button
            name="Login"
            onClick={() => {
              login();
            }}
          />
          <Button name="Sign Up" onClick={() => {}} />
          <div id="redirect"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
