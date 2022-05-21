import { useContext } from "react";

import UserProfile from "../components/Profile/UserProfile";

import EnvelopeContext from "../../shared/context/esaving-context";
import Modal from "../../shared/components/UI/Modal/Modal";

const User = (props) => {
  const envCtx = useContext(EnvelopeContext);

  return (
    <Modal onClose={envCtx.hideProfile} show={envCtx.isProfileShown}>
      <UserProfile onClick={envCtx.hideProfile} />
    </Modal>
  );
};

export default User;
