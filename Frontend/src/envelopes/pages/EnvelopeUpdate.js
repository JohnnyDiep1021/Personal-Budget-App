import react, { useEffect, useState, useContext } from "react";

import EnvelopeContext from "../../shared/context/esaving-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hooks";
import {
  VALIDATOR_MIN,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";
import Input from "../../shared/components/UI/Input/Input";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/UI/Button/Button";
import CloseIcon from "../../shared/components/Icon/CloseIcon";

import "./EnvelopeUpdate.css";
// import "../components/EnvelopeUI/Side.css";
const EnvelopeUpdate = (props) => {
  const envelopeCtx = useContext(EnvelopeContext);
  const history = useHistory();
  const envelopeId = useParams().envelopeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEnvelope, setLoadedEnvelope] = useState();
  // console.log(envelopeCtx.token);
  // console.log(envelopeId)
  const [formState, inputHandler, setFormData] = useForm(
    {
      category: { value: "", isValid: false },
      budget: { value: "", isValid: false },
      note1: { value: "", isValid: false },
      note2: { value: "", isValid: false },
      note3: { value: "", isValid: false },
      note4: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    // fetching data from back-end will take longer time while the custom hook may run earlier
    const fetchEnvelope = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/envelopes/${envelopeId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envelopeCtx.token,
          }
        );
        console.log(responseData);
        setLoadedEnvelope(responseData.envelope);
        setFormData(
          {
            category: { value: responseData.envelope.category, isValid: true },
            budget: { value: responseData.envelope.budget, isValid: true },
            note1: {
              value: responseData.envelope.notes[0].note,
              isValid: true,
            },
            note2: {
              value: responseData.envelope.notes[1].note,
              isValid: true,
            },
            note3: {
              value: responseData.envelope.notes[2].note,
              isValid: true,
            },
            note4: {
              value: responseData.envelope.notes[3].note,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchEnvelope();
  }, [sendRequest, envelopeId, setFormData, envelopeCtx.token]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // console.log(formState.inputs);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/envelopes/${envelopeId}`,
        "PATCH",
        JSON.stringify({
          category: formState.inputs.category.value,
          budget: formState.inputs.budget.value,
          notes: [
            { note: formState.inputs.note1.value },
            { note: formState.inputs.note2.value },
            { note: formState.inputs.note3.value },
            { note: formState.inputs.note4.value },
          ],
        }),
        {
          Authorization: "Bearer " + envelopeCtx.token,
          "Content-Type": "application/json",
        }
      );
      envelopeCtx.hideUpdatePage();
      history.push("/envelopes");
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="popup-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEnvelope && !error) {
    return (
      <div className="popup-center">
        <h2>Could not find envelope with ID-{`${envelopeId}`}!</h2>
      </div>
    );
  }

  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && loadedEnvelope && (
        <form className="update-form" onSubmit={updateSubmitHandler}>
          <Card>
            <div className="card__update">
              <div className="header">
                <Input
                  element="input"
                  id="category"
                  type="text"
                  placeholder="New category"
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(23)]}
                  errorText="cannot be empty, only 23 characters"
                  errorStyle={{ textAlign: "center" }}
                  initialValue={loadedEnvelope.category}
                  initialValid={true}
                />
                <Input
                  element="input"
                  id="budget"
                  type="number"
                  label="$"
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                  errorText="amount must be greater than or equal to 0"
                  initialValue={`${loadedEnvelope.budget}`}
                  initialValid={true}
                  step="0.01"
                />
              </div>

              <div className="note">
                <p className="heading">Note:</p>
                <Input
                  element="input"
                  id={`note1`}
                  type="text"
                  placeholder="New note"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MAXLENGTH(36)]}
                  errorText="only 36 characters"
                  initialValue={loadedEnvelope.notes[0].note}
                  initialValid={true}
                />
                <Input
                  element="input"
                  id={`note2`}
                  type="text"
                  placeholder="New note"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MAXLENGTH(36)]}
                  errorText="only 36 characters"
                  initialValue={loadedEnvelope.notes[1].note}
                  initialValid={true}
                />
                <Input
                  element="input"
                  id={`note3`}
                  type="text"
                  placeholder="New note"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MAXLENGTH(36)]}
                  errorText="only 36 characters"
                  initialValue={loadedEnvelope.notes[2].note}
                  initialValid={true}
                />
                <Input
                  element="input"
                  id={`note4`}
                  type="text"
                  placeholder="New note"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MAXLENGTH(36)]}
                  errorText="only 36 characters"
                  initialValue={loadedEnvelope.notes[3].note}
                  initialValid={true}
                />
              </div>

              <Button
                type="submit"
                className="btn btn-save btn--white"
                disabled={!formState.isValid || error}
              >
                Save
              </Button>
              <Button
                to="/envelopes"
                className="btn-close"
                onClick={envelopeCtx.hideUpdatePage}
              >
                <CloseIcon />
              </Button>
            </div>
          </Card>
        </form>
      )}
    </react.Fragment>
  );
};

export default EnvelopeUpdate;
