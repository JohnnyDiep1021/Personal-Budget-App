import react from "react";

const EnvelopeContext = react.createContext({
  user: {},
  token: null,
  tokenExpirationDate: null,
  envelopes: [],
  isLoggedIn: false,
  isEnvelopeCreated: false,
  isProfileShown: false,
  isDepositFormShown: false,
  isTransferFormShown: false,
  isUpdateActive: false,
  // dummy function
  showProfile: () => {},
  hideProfile: () => {},
  showDepositForm: () => {},
  hideDepositForm: () => {},
  showTransferForm: () => {},
  hideTransferForm: () => {},
  showNewEnvelope: () => {},
  hideNewEnvelope: () => {},
  showUpdatePage: () => {},
  hideUpdatePage: () => {},
  login: () => {},
  logout: () => {},
  addUser: (user) => {},
  addEnvelope: (envelope) => {},
  addToken: (token) => {},
  removeEnvelope: (envelopeId) => {},
});

export default EnvelopeContext;
