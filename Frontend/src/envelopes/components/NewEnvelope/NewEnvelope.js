import react, { useContext } from "react";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import EnvelopeContext from "../../../shared/context/esaving-context";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import CloseIcon from "../../../shared/components/Icon/CloseIcon";

import {
  VALIDATOR_MIN,
  VALIDATOR_MAXLENGTH,
} from "../../../shared/util/validators";

import "./NewEnvelope.css";

const defaultInputs = {
  category: { value: "New title", isValid: true },
  budget: { value: "0", isValid: true },
  note1: { value: "", isValid: true },
  note2: { value: "", isValid: true },
  note3: { value: "", isValid: true },
  note4: { value: "", isValid: true },
};
const NewEnvelope = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const [formState, inputHandler, setFormData] = useForm(defaultInputs, true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/envelopes`,
        "POST",

        JSON.stringify({
          category: formState.inputs.category.value,
          budget: +formState.inputs.budget.value,
          notes: [
            { note: formState.inputs.note1.value },
            { note: formState.inputs.note2.value },
            { note: formState.inputs.note3.value },
            { note: formState.inputs.note4.value },
          ],
        }),
        {
          Authorization: "Bearer " + envCtx.token,
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      // normally, useHistory() is used to re-direct users. In this case, "/" path is not available => re-direct to '/envelopes'
      history.push("/");

      // // transforms a list of key-value pairs into an object.
      // const mapValue = Object.fromEntries(
      //   Object.keys(formState.inputs).map((key) => {
      //     // create dynamic object
      //     // let obj = {};
      //     // obj[key] = formState.inputs[key].value;
      //     return [key, formState.inputs[key].value];
      //   })
      // );
      // const envelope = {
      //   ...mapValue,
      //   budget: +mapValue.budget,
      // };
    } catch (error) {
      setFormData(defaultInputs, true);
    }
  };
  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      <Modal onClose={envCtx.hideNewEnvelope} show={envCtx.isEnvelopeCreated}>
        <form className="form-env" onSubmit={formSubmitHandler}>
          {isLoading && (
            <LoadingSpinner asOverlay style={{ borderRadius: "12px" }} />
          )}
          <div className="input-box">
            <h2 className="env-heading">New envelope</h2>
            <Input
              element="input"
              id="category"
              label="Category"
              type="text"
              placeholder="Enter new category"
              onInput={inputHandler}
              validators={[VALIDATOR_MAXLENGTH(23)]}
              errorText="only 23 characters"
              initialValue={formState.inputs.category.value}
              initialValid={formState.inputs.category.isValid}
            />
            <Input
              element="input"
              id="budget"
              label="Budget"
              type="number"
              placeholder="Enter amount"
              onInput={inputHandler}
              validators={[VALIDATOR_MIN(0)]}
              errorText="amount must be greater than or equal to 0"
              initialValue={formState.inputs.budget.value}
              initialValid={formState.inputs.budget.isValid}
            />
            <div className="note">
              <Input
                element="input"
                id={`note1`}
                label="Note"
                type="text"
                placeholder="Enter new note"
                onInput={inputHandler}
                validators={[VALIDATOR_MAXLENGTH(36)]}
                errorText="only 36 characters"
                initialValue={formState.inputs.note1.value}
                initialValid={formState.inputs.note1.isValid}
              />
              <Input
                element="input"
                id={`note2`}
                type="text"
                placeholder="Enter new note"
                onInput={inputHandler}
                validators={[VALIDATOR_MAXLENGTH(36)]}
                errorText="only 36 characters"
                initialValue={formState.inputs.note2.value}
                initialValid={formState.inputs.note2.isValid}
              />
              <Input
                element="input"
                id={`note3`}
                type="text"
                placeholder="Enter new note"
                onInput={inputHandler}
                validators={[VALIDATOR_MAXLENGTH(36)]}
                errorText="only 36 characters"
                initialValue={formState.inputs.note3.value}
                initialValid={formState.inputs.note3.isValid}
              />
              <Input
                element="input"
                id={`note4`}
                type="text"
                placeholder="Enter new note"
                onInput={inputHandler}
                validators={[VALIDATOR_MAXLENGTH(36)]}
                errorText="only 36 characters"
                initialValue={formState.inputs.note4.value}
                initialValid={formState.inputs.note4.isValid}
              />
            </div>

            <Button
              type="submit"
              className="btn btn--env btn--white"
              disabled={!formState.isValid || error}
              onClick={envCtx.hideNewEnvelope}
            >
              Create envelope
            </Button>
            <Button className="btn-close" onClick={envCtx.hideNewEnvelope}>
              <CloseIcon />
            </Button>
          </div>
        </form>
      </Modal>
    </react.Fragment>
  );
};

export default NewEnvelope;
