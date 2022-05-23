import react, { useRef, useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../../hooks/http-hook";
import EnvelopeContext from "../../../context/esaving-context";

import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Button from "../Button/Button";

import "./ImageUpload.css";
const ImageUpload = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [error, setError] = useState();
  // const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  // // generate a preview the uploaded image files
  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   // js api,
  //   const fileReader = new FileReader();
  //   // read, parse, convert binary data of a file into readable, outputable image url
  //   // this func will be executed when reading of file is done
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // }, [file]);

  const pickedHandler = async (event) => {
    console.log(event.target.files);
    try {
      let imageUrl;
      let pickedFile;
      let fileIsValid = isValid;
      // is only 1 file submitted?
      if (event.target.files && event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        // console.log(pickedFile.name, pickedFile.type);

        // get secure url from our server
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/sign-s3?file-name=${pickedFile.name}&file-type=${pickedFile.type}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envCtx.token,
          }
        );

        console.log(responseData.url);
        // post the image directly to the S3 bucket
        if (responseData.url) {
          const uploadResponseData = await fetch(responseData.url, {
            method: "PUT",
            body: pickedFile,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          // const uploadResponseData = uploadResponse.json()

          if (uploadResponseData.ok) {
            imageUrl = responseData.url.split("?")[0];
            setPreviewUrl(imageUrl);
            setIsValid(true);
            fileIsValid = true;
          }
        }

        // setFile(pickedFile);
        // setIsValid(true);
        // fileIsValid = true;
      } else {
        setIsValid(false);
        fileIsValid = false;
      }
      // props.onInput(props.id, pickedFile, fileIsValid);
      props.onInput(props.id, imageUrl, fileIsValid);
    } catch (error) {
      error.message = `An error occurred. Could not upload image!`;
      setError(error.message);
      console.log(error);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
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
            {isLoading && <LoadingSpinner asOverlay />}
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
    </react.Fragment>
  );
};

export default ImageUpload;
