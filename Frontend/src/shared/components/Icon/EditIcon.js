import "./EditIcon.css";

const EditIcon = (props) => {
  return (
    <ion-icon
      class="icon-edit"
      name="create-outline"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};

export default EditIcon;
