import react, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import EnvelopeContext from "../../../shared/context/esaving-context";

import Avatar from "../../../shared/components/Avatar/Avatar";
import {
  FacebookIcon,
  GithubIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "../../../shared/components/Icon/MediaIcon";
import EditIcon from "../../../shared/components/Icon/EditIcon";
import CloseIcon from "../../../shared/components/Icon/CloseIcon";
import Button from "../../../shared/components/UI/Button/Button";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import "./UserProfile.css";

const UserProfile = (props) => {
  const envCtx = useContext(EnvelopeContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me`,
          "GET",
          null,
          {
            Authorization: "Bearer " + envCtx.token,
          }
        );
        setUserProfile(responseData.user);
      } catch (error) {}
    };
    fetchUserProfile();
  }, [sendRequest, envCtx.token]);

  return (
    <react.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && userProfile && (
        <div className="user-profile">
          <div className="left-box">
            {/* <div className="user-img">
          <img src="" alt="user"></img>
        </div> */}
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${userProfile.image}`}
              className=""
            />
            <Button
              to="/user/profile"
              className="btn-close btn-edit--icon"
              onClick={() => {
                props.onClick && props.onClick();
                envCtx.showUpdatePage();
              }}
            >
              <EditIcon />
            </Button>
            <p className="user-name">{userProfile.name}</p>
            {userProfile.expertise && (
              <p className="user-job">{userProfile.expertise}</p>
            )}
            <Button
              to="/user/profile"
              className="btn btn--white btn-edit--btn"
              onClick={() => {
                props.onClick && props.onClick();
                envCtx.showUpdatePage();
              }}
            >
              Edit
            </Button>
          </div>
          <div className="right-box">
            <div className="info-box">
              <h4 className="info-heading">Information</h4>
              <div className="info-content">
                <div className="email">
                  <h4>Email</h4>
                  <p>{userProfile.email}</p>
                </div>
                <div className="username">
                  <h4>Username</h4>
                  <p>{userProfile.username}</p>
                </div>
              </div>
            </div>
            <div className="media-box">
              <h4 className="media-heading">Social Media</h4>
              <div className="media-content">
                <Button href={props.github} className="btn-icon">
                  <GithubIcon />
                </Button>
                <Button href={props.linkedin} className="btn-icon">
                  <LinkedinIcon />
                </Button>
                <Button href={props.whatsapp} className="btn-icon">
                  <WhatsappIcon />
                </Button>
                <Button href={props.facebook} className="btn-icon">
                  <FacebookIcon />
                </Button>
              </div>
            </div>
          </div>
          <Button className="btn-close" onClick={props.onClick}>
            <CloseIcon />
          </Button>
        </div>
      )}
    </react.Fragment>
  );
};

export default UserProfile;
