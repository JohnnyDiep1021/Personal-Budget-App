import { useState } from "react";

import FormSignin from "../components/Registration/SigninForm";
import FormSignup from "../components/Registration/SignupForm";

import "./Auth.css";

const Auth = (props) => {
  const [isAccountExisted, setIsAccountExisted] = useState(true);

  const switchModeHandler = (val) => {
    console.log(val);
    setIsAccountExisted(val);
  };
  return (
    <section className="section-welcome">
      {!isAccountExisted && <FormSignup onClick={switchModeHandler} />}
      {isAccountExisted && <FormSignin onClick={switchModeHandler} />}
    </section>
  );
};

export default Auth;
