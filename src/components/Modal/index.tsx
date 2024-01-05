import Centered from "../Centered";
import "./Modal.css";

const Modal = (params: { children?: any }) => {
  return (
    <Centered>
      <div className="modal">{params.children}</div>
    </Centered>
  );
};

export default Modal;
