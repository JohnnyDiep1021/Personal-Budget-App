import react, { useRef, useState, useEffect } from "react";

import Button from "../Button/Button";

import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  // generate a preview the uploaded image files
  useEffect(() => {
    if (!file) {
      return;
    }
    // js api,
    const fileReader = new FileReader();
    // read, parse, convert binary data of a file into readable, outputable image url
    // this func will be executed when reading of file is done
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    // is only 1 file submitted?
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {(previewUrl || props.src) && (
            <img src={previewUrl || props.src} alt="Preview" />
          )}
          {!previewUrl && !props.src && <p>Please pick an image.</p>}
        </div>
        {!isValid && !props.src && (
          <p className="error-message">{props.errorText}</p>
        )}
        <Button
          type="button"
          className="btn btn--white"
          onClick={pickImageHandler}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
