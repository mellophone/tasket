import { HTMLInputTypeAttribute } from "react";
import "./FormInput.css";

const FormInput = (params: {
  type: HTMLInputTypeAttribute;
  required?: boolean;
}) => {
  return (
    <input
      className="form-input medium-text"
      type={params.type}
      id={params.type}
      name={params.type}
      required={params.required}
    />
  );
};

export default FormInput;
