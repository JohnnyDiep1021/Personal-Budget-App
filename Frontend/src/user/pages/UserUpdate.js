import react, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import EnvelopeContext from "../../shared/context/esaving-context";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import {
  NAME_MINLENGTH,
  USERNAME_MINLENGTH,
  USERNAME_MAXLENGTH,
  EMAIL_MINLENGTH,
  EMAIL_MAXLENGTH,
} from "../../shared/util/util";
import ImageUpload from "../../shared/components/UI/Upload/ImageUpload";
import Input from "../../shared/components/UI/Input/Input";
import CloseIcon from "../../shared/components/Icon/CloseIcon";
import Button from "../../shared/components/UI/Button/Button";
import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";
import "./UserUpdate.css";

const UserUpdateForm = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userProfile, setUserProfile] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
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
      expertise: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envCtx.token,
          }
        );
        // console.log(responseData.user);
        setUserProfile(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            username: {
              value: responseData.user.username,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            password: {
              value: responseData.user.password,
              isValid: true,
            },
            expertise: {
              value: responseData.user.expertise,
              isValid: true,
            },
            image: {
              value: responseData.user.image,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchUserProfile();
  }, [sendRequest, setFormData, envCtx.token]);
  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // console.log(formState.inputs.image.value);
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("username", formState.inputs.username.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("expertise", formState.inputs.expertise.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/me`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + envCtx.token,
        }
      );
      envCtx.hideUpdatePage();
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

  if (!userProfile && !error) {
    return (
      <div className="popup-center">
        <h2>Could not find user profile</h2>
      </div>
    );
  }

  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && userProfile && (
        <form className="form-user--update" onSubmit={updateSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="left-box">
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              // src={`${process.env.REACT_APP_ASSET_URL}/${userProfile.image}`}
              src={`${userProfile.image}`}
              errorText="Please provide an image"
            />
          </div>
          <div className="right-box">
            <h2 className="heading">Personal Information</h2>
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              onInput={inputHandler}
              validators={[
                VALIDATOR_MINLENGTH(NAME_MINLENGTH),
                VALIDATOR_MAXLENGTH(30),
              ]}
              errorText="2-30 characters"
              initialValue={userProfile.name}
              initialValid={true}
            />
            <Input
              element="input"
              id="username"
              type="text"
              label="Username"
              placeholder="johnSmith"
              validators={[
                VALIDATOR_MINLENGTH(USERNAME_MINLENGTH),
                VALIDATOR_MAXLENGTH(USERNAME_MAXLENGTH),
              ]}
              errorText="6-36 characters"
              onInput={inputHandler}
              initialValue={userProfile.username}
              initialValid={true}
            />
            <Input
              element="input"
              id="email"
              type="email"
              label="Email"
              placeholder="johnsmith@gmail.com"
              validators={[
                VALIDATOR_EMAIL(),
                VALIDATOR_MINLENGTH(EMAIL_MINLENGTH),
                VALIDATOR_MAXLENGTH(EMAIL_MAXLENGTH),
              ]}
              errorText="include @, 3-80 characters"
              onInput={inputHandler}
              initialValue={userProfile.email}
              initialValid={true}
            />
            <Input
              element="input"
              id="expertise"
              type="text"
              label="Expertise"
              placeholder="data analyst, developer,..."
              validators={[VALIDATOR_MAXLENGTH(24)]}
              errorText="only 24 characters"
              onInput={inputHandler}
              initialValue={userProfile.expertise}
              initialValid={true}
            />
            <div className="save-container">
              <Button
                type="submit"
                className="btn btn--danger btn--save"
                disabled={!formState.isValid || error}
              >
                Save
              </Button>
            </div>
          </div>
          <Button
            to="/envelopes"
            className="btn-close"
            onClick={envCtx.hideUpdatePage}
          >
            <CloseIcon />
          </Button>
        </form>
      )}
    </react.Fragment>
  );
};

export default UserUpdateForm;
