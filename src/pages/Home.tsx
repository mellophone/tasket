import React from "react";
import "./Home.css";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <div className="Home">
        <Link to="/">click here</Link>
      </div>
    </div>
  );
};

export default Home;
