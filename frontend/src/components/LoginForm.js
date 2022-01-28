import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";

// first page
// login Form to get user credentials :login :signup
const LoginForm = function ({ loginLabel, setLoginLabel }) {
  const [signUpLabel, setSignUpLabel] = useState(false);
  const [fieldIsHidden, setFieldIsHidden] = useState(true);

  return (
    <div
      className="
    shadow-gray-500 shadow-2xl
      px-5 py-5"
    >
      <label>{loginLabel ? "login" : "sign up"}</label>
      <InputField type="text" placeholder="user name" />
      <InputField type="password" placeholder="password" />

      {/* additional field for signup  */}
      {/* only show when signup clicked */}
      <div className={fieldIsHidden ? "hidden" : ""}>
        <InputField type="password" placeholder="confirm password" />
      </div>

      {/* Button to navigate to gamemode screen */}
      {/* Signup button */}
      <div
        className="
        flex justify-around"
      >
        <Link to="/game-mode">
          <Button
            // go to game mode
            label={<FaSignInAlt />}
            bgcolor="teal"
            color="rgb(31 41 55)"
          />
        </Link>
        <Button
          label={signUpLabel ? "Done" : "sign up"}
          bgcolor="orange"
          color="rgb(31 41 55)"
          signUpLabel={signUpLabel}
          setSignUpLabel={setSignUpLabel}
          loginLabel={loginLabel}
          setLoginLabel={setLoginLabel}
          fieldIsHidden={fieldIsHidden}
          setFieldIsHidden={setFieldIsHidden}
        />
      </div>
    </div>
  );
};

export default LoginForm;
