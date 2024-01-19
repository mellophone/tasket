import Centered from "../Centered";

const Modal = (params: { children?: any }) => {
  return (
    <Centered>
      <div className="outlined-block">{params.children}</div>
    </Centered>
  );
};

export default Modal;
