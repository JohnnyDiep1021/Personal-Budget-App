import React, { useContext, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import EnvelopeContext from "./shared/context/esaving-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import Auth from "./user/pages/Auth";
// import User from "./user/pages/User";
// import DepositForm from "./user/components/Deposit/DepositForm";
// import TransferForm from "./envelopes/components/Transfer/Transfer";
// import Envelopes from "./envelopes/pages/Envelopes";
// import NewEnvelope from "./envelopes/components/NewEnvelope/NewEnvelope";
// import EnvelopeUpdate from "./envelopes/pages/EnvelopeUpdate";
// import UserUpdateForm from "./user/pages/UserUpdate";

import LoadingSpinner from "./shared/components/UI/Loading/LoadingSpinner";
// change the way of importing to reduce the size of each chunk when building final app version for production
const Auth = React.lazy(() => import("./user/pages/Auth"));
const User = React.lazy(() => import("./user/pages/User"));
const DepositForm = React.lazy(() =>
  import("./user/components/Deposit/DepositForm")
);
const TransferForm = React.lazy(() =>
  import("./envelopes/components/Transfer/Transfer")
);
const Envelopes = React.lazy(() => import("./envelopes/pages/Envelopes"));
const EnvelopeUpdate = React.lazy(() =>
  import("./envelopes/pages/EnvelopeUpdate")
);
const NewEnvelope = React.lazy(() =>
  import("./envelopes/components/NewEnvelope/NewEnvelope")
);
const UserUpdateForm = React.lazy(() => import("./user/pages/UserUpdate"));

let loggoutTimer;

const App = () => {
  const envCtx = useContext(EnvelopeContext);
  let routes;
  const { login, token, tokenExpirationDate, logout } = envCtx;
  // auto login
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  // auto loggout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      // .getTime() => get time in mili seconds
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      loggoutTimer = setTimeout(() => {
        logout(token);
      }, remainingTime);
    } else {
      clearTimeout(loggoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  if (token) {
    routes = (
      <Switch>
        <Route path="/envelopes" exact>
          <Envelopes />
          <NewEnvelope />
          <User />
          <DepositForm />
          <TransferForm />
        </Route>
        <Route path="/envelopes/:envelopeId">
          <EnvelopeUpdate />
        </Route>
        <Route path="/user/profile">
          <UserUpdateForm />
        </Route>
        <Redirect to="/envelopes" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        {/* 
        <Route path="/">
          <p style={{ fontSize: "90px" }}>404, Page is not found</p>
        </Route> */}
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <React.Fragment>
      {/* in Router, each route will run from top to bottom */}
      <Router>
        {/* Work like switch statement, only one matched route will be rendered in Switch */}

        <MainNavigation />
        <main>
          <Suspense
            // if the dowloading process take more time, render the below fallback
            fallback={
              <div className="">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
