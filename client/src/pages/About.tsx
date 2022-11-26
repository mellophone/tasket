import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export interface IAboutProps {}

const About: React.FunctionComponent<IAboutProps> = (props) => {
  const [message, setMessage] = useState("");
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      setMessage("FOUND: " + number);
    } else {
      setMessage("NOT FOUND");
    }
  }, []);

  return (
    <div>
      <p>About Page</p>
      <p>{message}</p>
    </div>
  );
};

export default About;
