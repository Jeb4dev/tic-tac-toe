import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";

// first page
// login Form to get user credentials :login :signup
const LoginForm = function ({ loginLabel, setLoginLabel }) {
  const [signUpLabel, setSignUpLabel] = useState(false);
  const [fieldIsHidden, setFieldIsHidden] = useState(true);

  useEffect(function () {
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit");

    form.addEventListener("input", getUserData);
    submitButton.addEventListener("click", logUserIn);

    // async function logUserIn(e) {
    //   // e.preventDefault();
    //   const req = await fetch("http://localhost:5000/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(getUserData()),
    //   });
    // }

    async function logUserIn(e) {
      // e.preventDefault();
      const req = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: getUserData(),
      });
      const response = await req.json();
      console.log(response);
      console.log(response.access_token);
      localStorage.setItem("access_token", response.access_token);
    }

    //   function getUserData() {
    //     const userName = document.getElementById("username").value;
    //     const password = document.getElementById("password").value;
    //     const user = {
    //       username: userName,
    //       userPassword: password,
    //     };
    //     return user;
    //   }
    // });

    function getUserData() {
      const userName = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      return JSON.stringify({ username: userName, password: password });
    }
  });

  return (
    <form
      className="
    shadow-gray-500 shadow-2xl
      px-5 py-5"
      id="form"
    >
      <label>{loginLabel ? "login" : "sign up"}</label>
      <InputField id="username" type="text" placeholder="user name" />
      <InputField id="password" type="password" placeholder="password" />

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
            id="submit"
            type="submit"
            color="rgb(31 41 55)"
          />
        </Link>
        <Button
          label={signUpLabel ? "Done" : "sign up"}
          bgcolor="orange"
          signUpLabel={signUpLabel}
          setSignUpLabel={setSignUpLabel}
          loginLabel={loginLabel}
          setLoginLabel={setLoginLabel}
          fieldIsHidden={fieldIsHidden}
          setFieldIsHidden={setFieldIsHidden}
          color="rgb(31 41 55)"
        />
      </div>
    </form>
  );
};

export default LoginForm;
