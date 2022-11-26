import React, { useEffect } from "react";
import "./Home.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DBService from "../DBService";
import NavButton from "../components/NavButton";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  // EXAMPLE EXAMPLE EXAMPLE
  const func = async () => {
    const response = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    alert(JSON.stringify(await response.json()));
  };
  // EXAMPLE EXAMPLE EXAMPLE

  const putMyName = async () => {
    const q = document.getElementsByClassName("Home")[0];
    const user = await DBService.getUser();
    q.innerHTML = `Welcome back, ${user.email}!`;
  };

  useEffect(() => {
    putMyName();
  });

  return (
    <div>
      <div className="Home">.</div>
      <NavButton dest="add" />
    </div>
  );
};

export default Home;
