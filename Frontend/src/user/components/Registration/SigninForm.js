import React, { useContext } from "react";
import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import EnvelopeContext from "../../../shared/context/esaving-context";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import Button from "../../../shared/components/UI/Button/Button";
import Input from "../../../shared/components/UI/Input/Input";

import "./RegistrationForm.css";

const FormSignin = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const signUpModeHandler = (event) => {
    console.log(formState.isValid);
    props.onClick(false);
  };

  const signinSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      envCtx.addUser(responseData.user);
      envCtx.login(responseData.token);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      <form className="form-regis signin" onSubmit={signinSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="heading">
          <h3 className="heading__title">Log in to E-Saving</h3>
        </div>
        <Input
          id="username"
          element="input"
          label="Username/ Email"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="valid username/ email required!"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          name="password"
          type="password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="valid password required!"
          onInput={inputHandler}
        />
        <div className="btn--form ">
          <Button
            type="submit"
            className="button"
            disabled={!formState.isValid || error}
          >
            Log In
          </Button>
          <Button className="link" onClick={signUpModeHandler}>
            Can't login? Sign up for an account
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default FormSignin;
