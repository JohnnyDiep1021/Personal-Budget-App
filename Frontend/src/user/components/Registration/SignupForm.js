import React, { useContext } from "react";
import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import EnvelopeContext from "../../../shared/context/esaving-context";
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from "../../../shared/util/validators";
import {
  NAME_MINLENGTH,
  NAME_MAXLENGTH,
  USERNAME_MINLENGTH,
  USERNAME_MAXLENGTH,
  EMAIL_MINLENGTH,
  EMAIL_MAXLENGTH,
} from "../../../shared/util/util";

import "./RegistrationForm.css";

const FormSignup = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const [formState, inputHandler] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
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
  const signinModeHandler = (event) => {
    console.log(formState.isValid);
    props.onClick(true);
  };
  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,

        "POST",
        JSON.stringify({
          name: `${formState.inputs.firstname.value} ${formState.inputs.lastname.value}`,
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          // let the server know what type of data it will get
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
      <form className="form-regis signup" onSubmit={signupSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="heading">
          <h3 className="heading__title">Sign up for your account</h3>
        </div>
        <div className="form__first-row">
          <Input
            id="firstname"
            element="input"
            className="form-regis"
            label="First Name"
            type="text"
            placeholder="John"
            validators={[
              VALIDATOR_MINLENGTH(NAME_MINLENGTH),
              VALIDATOR_MAXLENGTH(NAME_MAXLENGTH),
            ]}
            errorText="2-23 characters"
            onInput={inputHandler}
          />
          <Input
            id="lastname"
            element="input"
            className="form-regis"
            label="Last Name"
            type="text"
            placeholder="Smith"
            validators={[
              VALIDATOR_MINLENGTH(NAME_MINLENGTH),
              VALIDATOR_MAXLENGTH(NAME_MAXLENGTH),
            ]}
            errorText="2-23 characters"
            onInput={inputHandler}
          />
        </div>
        <Input
          id="username"
          element="input"
          label="Username"
          type="text"
          placeholder="johnSmith"
          validators={[
            VALIDATOR_MINLENGTH(USERNAME_MINLENGTH),
            VALIDATOR_MAXLENGTH(USERNAME_MAXLENGTH),
          ]}
          errorText="6-36 characters"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          label="Email"
          type="email"
          placeholder="johnsmith@gmail.com"
          validators={[
            VALIDATOR_EMAIL(),
            VALIDATOR_MINLENGTH(EMAIL_MINLENGTH),
            VALIDATOR_MAXLENGTH(EMAIL_MAXLENGTH),
          ]}
          errorText="include '@' (3-254 characters)"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          type="password"
          placeholder="password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="at least 8 characters containing ($,@,...), number(s), uppercase"
          onInput={inputHandler}
        />
        <div className="btn--form">
          <Button
            type="submit"
            className="button"
            disabled={!formState.isValid || error}
          >
            Sign Up
          </Button>
          <Button className="link" onClick={signinModeHandler}>
            Already have an E-Saving account? Log in
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default FormSignup;
