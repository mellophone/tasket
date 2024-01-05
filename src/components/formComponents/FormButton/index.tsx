import "./FormButton.css";

const FormButton = (params: {
  children: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  return (
    <button
      className="form-button medium-text"
      type={params.type}
      disabled={params.disabled}
    >
      {params.disabled ? "Loading..." : params.children}
    </button>
  );
};

export default FormButton;
