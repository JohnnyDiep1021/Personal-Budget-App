import react, { useState, useContext } from "react";

import EnvelopeContext from "../../../../shared/context/esaving-context";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import ErrorModal from "../../../../shared/components/UI/Modal/ErrorModal";
import MessageModal from "../../../../shared/components/UI/Modal/MessageModal";
import NoteItem from "../../Note/NoteItem";
import Modal from "../../../../shared/components/UI/Modal/Modal";
import Button from "../../../../shared/components/UI/Button/Button";
import CloseIcon from "../../../../shared/components/Icon/CloseIcon";

import "./FrontSide.css";
import "../Side.css";
import { Link } from "react-router-dom";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const FrontSide = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const envCtx = useContext(EnvelopeContext);
  const { error, message, sendRequest, clearError, clearMessage } =
    useHttpClient();
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/envelopes/${props.envelopeId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + envCtx.token,
        }
      );
      console.log(responseData);
    } catch (error) {}
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const noteList = props.notes.map((note) => (
    <NoteItem note={note?.note} key={Math.random()}></NoteItem>
  ));
  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      <MessageModal
        message={message}
        onClose={() => {
          clearMessage("/");
        }}
      />
      <Modal
        onClose={cancelDeleteHandler}
        show={showConfirmModal}
        element="popup"
        header="Confirm to delete"
        footer={
          <react.Fragment>
            <Button
              className="btn-popup btn--inverse"
              onClick={cancelDeleteHandler}
            >
              Cancel
            </Button>
            <Button
              className="btn-popup btn--danger"
              onClick={confirmDeleteHandler}
            >
              Delete
            </Button>
          </react.Fragment>
        }
      >
        <p>Are you sure? Once deleted, this action cannot be undone!</p>
      </Modal>
      <div className="envelope__seal--up">
        <div className="envelope-seal"></div>
      </div>
      <div className="envelope__seal--down">
        <div className="envelope-seal"></div>
        <h4 className="envelope__heading ">
          <span className="envelope__heading-span">{props.category}</span>
        </h4>
      </div>
      <div className="card__side envelope__side--front">
        <div className="card__content">
          <div className="card__cta">
            <div className="card__price-box">
              <p className="card__price-text">Budget</p>
              <p className="card__category--mobile">{props.category}</p>
              <span className="card__price-value">
                {formatter.format(props.budget)}
              </span>
              <p className="card__id--mobile">ID: {props.envelopeId}</p>
            </div>
          </div>
          <div className="card__details">
            <p className="card__details-header">Note:</p>
            <ul>{noteList}</ul>
          </div>
          <Link to={`/envelopes/${props.envelopeId}`}>
            <Button
              className="btn btn-edit btn--white"
              onClick={envCtx.showUpdatePage}
            >
              Edit
            </Button>
          </Link>
          <Button className="btn-close" onClick={showDeleteWarningHandler}>
            <CloseIcon />
          </Button>
        </div>
        <div className="card__id">
          <p className="card__id-heading">ID:</p>
          <span className="card__id-value">{props.envelopeId}</span>
        </div>
      </div>
    </react.Fragment>
  );
};

export default FrontSide;
