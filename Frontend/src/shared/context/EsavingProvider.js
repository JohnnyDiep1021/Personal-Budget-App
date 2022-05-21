import { useReducer, useState, useCallback } from "react";
import { useHttpClient } from "../hooks/http-hook";

import EnvelopeContext from "./esaving-context";

const defaultEnvelopeState = {
  envelopes: [],
};
const defaultUserState = {
  user: {},
};

const envelopeReducer = (state, action) => {
  let updatedEnvelopes;
  switch (action.type) {
    case "ADD":
      console.log(action.envelope);
      const existingEnvelopeIdx = state.envelopes.findIndex(
        (envelope) => envelope.envelopeId === action.envelope.envelopeId
      );
      const existingEnvelope = state.envelopes[existingEnvelopeIdx];

      console.log(existingEnvelope);
      // Update existing envelope
      if (existingEnvelope) {
        const updatedEnvelope = action.envelope;
        updatedEnvelopes = [...state.envelopes];
        updatedEnvelopes[existingEnvelopeIdx] = updatedEnvelope;
      } else {
        // add new envelope
        console.log(state.envelopes.concat(action.envelope));
        updatedEnvelopes = state.envelopes.concat(action.envelope);
      }
      console.log(updatedEnvelopes);
      return { envelopes: updatedEnvelopes };
    case "REMOVE":
      updatedEnvelopes = state.envelopes.filter(
        (envelope) => envelope.envelopeId !== action.envelopeId
      );
      return { envelopes: updatedEnvelopes };
    default:
      return defaultEnvelopeState;
  }
};
const userReducer = (state, action) => {
  let updatedUser;
  switch (action.type) {
    case "ADD":
      if (state.user.id) {
        updatedUser = state.user;
        const updates = Object.keys(action.user);
        updates.forEach((update) => {
          updatedUser[update] = action.user[update];
        });
      } else {
        updatedUser = Object.assign({}, action.user);
      }
      // console.log(updatedUser);
      return { user: updatedUser };
    default:
      return defaultUserState;
  }
};

const EnvelopeProvider = (props) => {
  const { sendRequest } = useHttpClient();
  // state management
  const [envelopeState, dispatchEnvelopeAction] = useReducer(
    envelopeReducer,
    defaultEnvelopeState
  );
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  const [authToken, setAuthToken] = useState();
  const [authTokenExpirationDate, setAuthTokenExpirationDate] = useState();
  const [newEnvelopeState, setNewEnvelopeState] = useState(false);
  const [profileState, setProfileState] = useState(false);
  const [depositState, setDepositState] = useState(false);
  const [transferState, setTransferState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  // action handler functions
  const addAuthTokenHandler = (token) => {
    setAuthToken(token);
  };
  const addUserHandler = (user) => {
    dispatchUserAction({ type: "ADD", user: user });
  };
  const addEnvelopeHandler = (envelope) => {
    console.log(envelope);
    dispatchEnvelopeAction({ type: "ADD", envelope: envelope });
  };
  const removeEnvelopeHandler = (envelopeId) => {
    dispatchEnvelopeAction({ type: "REMOVE", envelopeId: envelopeId });
  };
  const showHandler = () => {
    setNewEnvelopeState(true);
  };
  const hideHandler = () => {
    setNewEnvelopeState(false);
  };
  const showProfileHandler = () => {
    setProfileState(true);
  };
  const hideProfileHandler = () => {
    setProfileState(false);
  };
  const showDepositFormHandler = () => {
    setDepositState(true);
  };
  const hideDepositFormHandler = () => {
    setDepositState(false);
  };
  const showTransferFormHandler = () => {
    setTransferState(true);
  };
  const hideTransferFormHandler = () => {
    setTransferState(false);
  };
  const showUpdatePageHandler = () => {
    setUpdateState(true);
  };
  const hideUpdatePageHandler = () => {
    setUpdateState(false);
  };
  const loginHandler = useCallback((token, expirationDate) => {
    console.log("logging in!");
    setAuthToken(token);
    // generate date obj based on current date + 1h
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setAuthTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        // toISOString => avoid losing Date data when it get stringified
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logoutHanddler = useCallback(
    async (token) => {
      // const logoutDB = async () => {
      try {
        console.log("logging out!");
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
          "POST",
          null,
          {
            Authorization: token,
          }
        );
        setAuthToken(null);
        setAuthTokenExpirationDate(null);
        localStorage.removeItem("userData");
      } catch (error) {}
      // };
      // logoutDB();
    },
    [sendRequest]
  );
  // dynamically and automatically update data
  const esavingContext = {
    user: userState.user,
    isLoggedIn: !!authToken,
    token: authToken,
    tokenExpirationDate: authTokenExpirationDate,
    envelopes: envelopeState.envelopes,
    addUser: addUserHandler,
    addToken: addAuthTokenHandler,
    addEnvelope: addEnvelopeHandler,
    removeEnvelope: removeEnvelopeHandler,
    isEnvelopeCreated: newEnvelopeState,
    showNewEnvelope: showHandler,
    hideNewEnvelope: hideHandler,
    isProfileShown: profileState,
    showProfile: showProfileHandler,
    hideProfile: hideProfileHandler,
    isDepositFormShown: depositState,
    showDepositForm: showDepositFormHandler,
    hideDepositForm: hideDepositFormHandler,
    isTransferFormShown: transferState,
    showTransferForm: showTransferFormHandler,
    hideTransferForm: hideTransferFormHandler,
    isUpdateActive: updateState,
    showUpdatePage: showUpdatePageHandler,
    hideUpdatePage: hideUpdatePageHandler,
    login: loginHandler,
    logout: logoutHanddler,
  };

  return (
    <EnvelopeContext.Provider value={esavingContext}>
      {props.children}
    </EnvelopeContext.Provider>
  );
};

export default EnvelopeProvider;
