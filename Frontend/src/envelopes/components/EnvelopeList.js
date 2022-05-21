import react, { useContext } from "react";
import EnvelopeItem from "./EnvelopeItems";

import EnvelopeContext from "../../shared/context/esaving-context";
import Button from "../../shared/components/UI/Button/Button";
import AddIcon from "../../shared/components/Icon/AddIcon";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";

import "./EnvelopeList.css";
import "../../shared/components/Layout/flex-box.css";

const EnvelopeList = (props) => {
  const envCtx = useContext(EnvelopeContext);

  // if (props.envelopes.length === 0) {
  //   return (
  //     <div className="flex-box center medium-gap">
  //       <h2>No envelopes found. Create a new envelope</h2>
  //     </div>
  //   );
  // }
  const envelopeList = props.envelopes.map((envelope) => (
    <EnvelopeItem
      id={envelope.envelopeId}
      key={envelope.envelopeId}
      category={envelope.category}
      budget={envelope.budget}
      notes={envelope.notes}
    ></EnvelopeItem>
  ));

  return (
    <react.Fragment>
      <ul className="env-list flex-box center medium-gap">
        {props.isLoading && <LoadingSpinner asOverlay />}
        {!props.isLoading && props.envelopes.length === 0 && (
          <h2 className="warning">No envelopes found. Create a new envelope</h2>
        )}
        {!props.isLoading && props.envelopes.length !== 0 && envelopeList}
        {!props.isLoading && (
          <div className="btn-container">
            <Button
              className="btn btn-add"
              type="submit"
              onClick={envCtx.showNewEnvelope}
            >
              <AddIcon />
            </Button>
          </div>
        )}
      </ul>
    </react.Fragment>
  );
};

export default EnvelopeList;
