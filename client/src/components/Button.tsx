import React, { MouseEventHandler } from "react";
import "./Button.css";

export interface IButtonProps {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  let fun: MouseEventHandler<HTMLButtonElement>;
  if (props.onClick !== undefined) {
    fun = props.onClick;
  } else {
    fun = () => {
      alert("FUCK");
    };
  }

  return (
    <button className="Button" onClick={fun}>
      {props.name}
    </button>
  );
};

export default Button;
