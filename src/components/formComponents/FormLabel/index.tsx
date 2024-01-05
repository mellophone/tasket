import "./FormLabel.css";

const FormLabel = (params: { children: string; htmlFor: string }) => {
  return (
    <div className="form-label">
      <label className="medium-text" htmlFor={params.htmlFor}>
        {params.children}
      </label>
    </div>
  );
};

export default FormLabel;
