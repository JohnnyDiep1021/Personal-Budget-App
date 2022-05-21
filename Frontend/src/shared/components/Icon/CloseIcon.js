import "./CloseIcon.css";

const CloseIcon = (props) => {
  // return <i className="fi fi-br-cross"></i>;
  return (
    <ion-icon
      class="icon-close"
      name="close-outline"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};

export default CloseIcon;
