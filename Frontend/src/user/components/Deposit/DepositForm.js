import react, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import { VALIDATOR_MIN } from "../../../shared/util/validators";
import EnvelopeContext from "../../../shared/context/esaving-context";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import CloseIcon from "../../../shared/components/Icon/CloseIcon";

import "./DepositForm.css";

const defaultInputs = {
  deposit: {
    value: "0",
    isValid: true,
  },
};
const DepositForm = (props) => {
  const history = useHistory();
  const envCtx = useContext(EnvelopeContext);
  const [formState, inputHandler, setFormData] = useForm(defaultInputs, true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const depositSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/deposit`,
        "PATCH",
        JSON.stringify({
          balance: +formState.inputs.deposit.value,
        }),
        {
          Authorization: "Bearer " + envCtx.token,
          "Content-Type": "application/json",
        }
      );
      console.log(responseData.update);
      history.push("/");
    } catch (error) {
      setFormData(defaultInputs, true);
    }
  };

  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      <Modal
        show={envCtx.isDepositFormShown}
        onClose={envCtx.hideDepositForm}
        className="modal-deposit"
      >
        <form className="form-deposit" onSubmit={depositSubmitHandler}>
          {isLoading && (
            <LoadingSpinner asOverlay style={{ borderRadius: "6px" }} />
          )}
          <h2 className="deposit-heading">Deposit Money</h2>
          <Input
            element="input"
            id="deposit"
            label="$"
            type="number"
            step=".01"
            onInput={inputHandler}
            validators={[VALIDATOR_MIN(0)]}
            errorText="amount must be greater than or equal to 0"
            initialValue={formState.inputs.deposit.value}
            initialValid={formState.inputs.deposit.isValid}
          />
          <Button
            type="submit"
            className="btn btn--white"
            onClick={envCtx.hideDepositForm}
            disabled={!formState.isValid || error}
          >
            Submit
          </Button>
          <Button className="btn-close" onClick={envCtx.hideDepositForm}>
            <CloseIcon />
          </Button>
        </form>
      </Modal>
    </react.Fragment>
  );
};

export default DepositForm;
