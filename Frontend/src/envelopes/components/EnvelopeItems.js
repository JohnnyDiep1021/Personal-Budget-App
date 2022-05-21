import react from "react";

import FrontSide from "./EnvelopeUI/Front-side/FrontSide";
import Card from "../../shared/components/UI/Card/Card";

const EnvelopeItem = (props) => {
  return (
    <react.Fragment>
      <li key={props.id}>
        <Card>
          <FrontSide
            category={props.category}
            budget={props.budget}
            notes={props.notes}
            envelopeId={props.id}
          ></FrontSide>
        </Card>
      </li>
    </react.Fragment>
  );
};

export default EnvelopeItem;
