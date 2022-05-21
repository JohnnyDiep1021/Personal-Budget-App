const NoteItem = (props) => {
  return (
    <li key={props.id}>
      <span className={`${props.note && "note-item"}`}>{props.note}</span>
    </li>
  );
};

export default NoteItem;
