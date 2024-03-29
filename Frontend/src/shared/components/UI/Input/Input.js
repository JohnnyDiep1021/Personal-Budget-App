import react, {
  useRef,
  useImperativeHandle,
  useReducer,
  useEffect,
} from "react";

import { validate } from "../../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = react.forwardRef((props, ref) => {
  const [inputState, dispatchInputAction] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatchInputAction({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatchInputAction({
      type: "TOUCH",
    });
  };

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // establish connection with the outside world components
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });

  let inputElement;
  switch (props.element) {
    case "input":
      inputElement = (
        <input
          ref={inputRef}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
          step={props.step}
        />
      );
      break;
    case "flex-input":
      inputElement = (
        <span
          ref={inputRef}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
          step={props.step}
          contentEditable
        ></span>
      );
      break;
    default:
      inputElement = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          {props.children}{" "}
        </textarea>
      );
  }
  // const inputElement =
  //   props.element === "input" ? (
  //     <input
  //       ref={inputRef}
  //       id={props.id}
  //       type={props.type}
  //       placeholder={props.placeholder}
  //       value={inputState.value}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       step={props.step}
  //     />
  //   ) : (
  //     <textarea
  //       id={props.id}
  //       rows={props.rows || 3}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       value={inputState.value}
  //     >
  //       {props.children}{" "}
  //     </textarea>
  //   );
  return (
    <div
      className={`input ${
        !inputState.isValid && inputState.isTouched && "invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && (
        <p
          className={`error-message ${props.errorClass}`}
          style={props.errorStyle}
        >
          {props.errorText}
        </p>
      )}
    </div>
  );
});

export default Input;
