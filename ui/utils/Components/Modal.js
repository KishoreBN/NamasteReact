import { useRef, useState } from "react";

const Modal = (props) => {
  const { openModal, closeModal, children } = props;
  const background = useRef();
  return openModal ? (
    <div
      className="modal-wrapper"
      onClick={(e) => {
        if (e?.target === background.current) {
          closeModal(true);
        }
      }}
      ref={background}
    >
      <div className="modal-container">{children}</div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
