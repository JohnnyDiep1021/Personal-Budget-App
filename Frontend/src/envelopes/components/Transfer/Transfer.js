import react, { useContext } from "react";
import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";

import EnvelopeContext from "../../../shared/context/esaving-context";

import MessageModal from "../../../shared/components/UI/Modal/MessageModal";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import CloseIcon from "../../../shared/components/Icon/CloseIcon";

import "./Transfer.css";
const defaultInputs = {
  from: {
    value: null,
    isValid: false,
  },
  to: {
    value: null,
    isValid: false,
  },
  amount: {
    value: "0",
    isValid: true,
  },
};
const TransferForm = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const { isLoading, error, message, sendRequest, clearError, clearMessage } =
    useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(defaultInputs, false);

  const transferSubmitHandler = async (event) => {
    event.preventDefault();
    const fromEnvelopeId = formState.inputs.from.value;
    const toEnvelopeId = formState.inputs.to.value;

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/envelopes/transfer/${fromEnvelopeId}/${toEnvelopeId}`,
        "POST",
        JSON.stringify({
          amount: +formState.inputs.amount.value,
        }),
        {
          Authorization: "Bearer " + envCtx.token,
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (error) {
      setFormData(defaultInputs, false);
    }
  };
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
        show={envCtx.isTransferFormShown}
        onClose={envCtx.hideTransferForm}
        className="modal-transfer"
      >
        <form className="form-transfer" onSubmit={transferSubmitHandler}>
          {isLoading && (
            <LoadingSpinner asOverlay style={{ borderRadius: "12px" }} />
          )}
          <h2 className="transfer-heading">Transfer Budget</h2>
          <Input
            element="input"
            id="from"
            label="from:"
            type="number"
            placeholder="envelopeId"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(6)]}
            errorText="fromEnvelopeId cannot be omitted"
            initialValue={formState.inputs.from.value}
            initialValid={formState.inputs.from.isValid}
          ></Input>
          <Input
            element="input"
            id="to"
            label="to:"
            type="number"
            placeholder="envelopeId"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(6)]}
            errorText="toEnvelopeId cannot be omitted"
            initialValue={formState.inputs.to.value}
            initialValid={formState.inputs.to.isValid}
          ></Input>
          <Input
            element="input"
            id="amount"
            label="$"
            type="number"
            placeholder="Enter the amount"
            onInput={inputHandler}
            validators={[VALIDATOR_MIN(0)]}
            errorText="amount must be greater than or equal to 0"
            initialValue={formState.inputs.amount.value}
            initialValid={formState.inputs.amount.isValid}
          ></Input>
          <Button
            type="submit"
            className="btn btn--white"
            disabled={!formState.isValid}
            onClick={envCtx.hideTransferForm}
          >
            Transfer
          </Button>
          <Button className="btn-close" onClick={envCtx.hideTransferForm}>
            <CloseIcon />
          </Button>
        </form>
      </Modal>
    </react.Fragment>
  );
};

export default TransferForm;
