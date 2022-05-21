import "./Balance.css";

import "../../../shared/components/Layout/flex-box.css";

const Balance = (props) => {
  return (
    <div className=" balance-box">
      <h4 className="balance-heading">Balance:</h4>
      <span className="balance-value">{props.amount}</span>
    </div>
  );
};

export default Balance;
