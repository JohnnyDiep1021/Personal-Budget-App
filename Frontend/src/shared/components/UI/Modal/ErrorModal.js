import React from "react";

import Modal from "./Modal";
import Button from "../Button/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      element="popup"
      onClose={props.onClose}
      header="An Error Occurred!"
      show={!!props.error}
      footer={
        <Button onClick={props.onClose} className="btn-popup btn--danger">
          Okay
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
