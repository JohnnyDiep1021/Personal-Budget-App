import react, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Balance from "../components/Balance/Balance";
import EnvelopeList from "../components/EnvelopeList";

import EnvelopeContext from "../../shared/context/esaving-context";
import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";

import "./Envelopes.css";
import "../../shared/components/Layout/flex-box.css";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const Envelopes = (props) => {
  const envelopeCtx = useContext(EnvelopeContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEnvelopes, setLoadedEnvelopes] = useState([]);
  const [loadedBalance, setLoadedBalance] = useState();

  useEffect(() => {
    const fetchEnvelopes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/envelopes`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envelopeCtx.token,
          }
        );
        const userResponseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envelopeCtx.token,
          }
        );
        // envelopeCtx.addEnvelope(responseData.envelopes);
        // console.log(responseData);
        setLoadedEnvelopes(responseData.envelopes);
        setLoadedBalance(formatter.format(userResponseData.user.balance));
      } catch (error) {}
    };
    fetchEnvelopes();
  }, [sendRequest, envelopeCtx.token]);
  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      <section className="section-envelopes ">
        <div className="flex-box center medium-gap">
          <Balance amount={loadedBalance} />
          <EnvelopeList envelopes={loadedEnvelopes} isLoading={isLoading} />
        </div>
      </section>
    </react.Fragment>
  );
};

export default Envelopes;
