import "./Card.css";

const Card = (props) => {
  return (
    <div className="card" style={{ width: props.width, height: props.height }}>
      {props.children}
    </div>
  );
};
export default Card;
