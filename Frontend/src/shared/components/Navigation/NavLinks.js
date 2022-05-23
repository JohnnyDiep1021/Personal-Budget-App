import { useContext } from "react";
import { NavLink } from "react-router-dom";

import EnvelopeContext from "../../context/esaving-context";
import "./NavLinks.css";

import Button from "../UI/Button/Button";
const NavLinks = (props) => {
  const envCtx = useContext(EnvelopeContext);

  return (
    <ul className="nav-links">
      {!envCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={props.onClick}>
            Authenticate
          </NavLink>
        </li>
      )}
      {envCtx.isLoggedIn && !envCtx.isUpdateActive && (
        <li>
          <NavLink to="/envelopes" exact onClick={props.onClick}>
            Home
          </NavLink>
        </li>
      )}
      {envCtx.isLoggedIn && !envCtx.isUpdateActive && (
        <li>
          <Button
            onClick={() => {
              envCtx.showProfile();
              props.onClick && props.onClick();
            }}
          >
            Profile
          </Button>
        </li>
      )}
      {envCtx.isLoggedIn && !envCtx.isUpdateActive && (
        <li>
          <Button
            onClick={() => {
              envCtx.showTransferForm();
              props.onClick && props.onClick();
            }}
          >
            Transfer
          </Button>
        </li>
      )}
      {envCtx.isLoggedIn && !envCtx.isUpdateActive && (
        <li>
          <Button
            onClick={() => {
              envCtx.showDepositForm();
              props.onClick && props.onClick();
            }}
          >
            Deposit
          </Button>
        </li>
      )}
      {envCtx.isLoggedIn && !envCtx.isUpdateActive && (
        <li>
          <Button
            onClick={() => {
              envCtx.logout(envCtx.token);
              props.onClick && props.onClick();
            }}
          >
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
