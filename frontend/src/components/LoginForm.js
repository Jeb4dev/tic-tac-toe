import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";

// first page
// login Form to get user credentials :login :signup
const LoginForm = function ({ loginLabel, setLoginLabel}) {
  const [signUpLabel, setSignUpLabel] = useState(false);
  const [fieldIsHidden, setFieldIsHidden] = useState(true)

  // Define if user is logging in or registering a new account
  // When user clicks submit buttoo
  function HandleFromSubmit () {
    // If user is in login form
    if (loginLabel) {
      // console.log(loginLabel, "Login");   
      LoginUser();

      return "";
    }
    // If user is not in login form - should be *register* form then
    else {
      // console.log(loginLabel, "Register"); 
      RegisterUser();

      return "";
    }
  }


  // Send API call - Register new account
  async function RegisterUser() {

    // get credentials
    let credentials = getUserRegisterData();

    // If credential recived send api call
    if (credentials) {
      console.log("Sending Registering API call...");
      const req = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: credentials,
        });
      const response = await req.json();

      // If API responses 
      if (response) {
        
        // if response is error, log it
        if (response.error) {
          console.log(response.error);
        }
        
        // Save access token, if recived
        if (response.access_token) {
          localStorage.setItem("access_token", response.access_token);
        }
      }
    }

    // Credentias were not recived - (passwords didn't match)
    else {
      console.log("Passwords doesn't match.");
    }
  };

  // Send API call - Login new account
  async function LoginUser() {

    // get credentials
    let credentials = getUserLoginData()

    // If credential recived send api call
    if (credentials) {
      console.log("Sending Login API call...");
      const req = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: credentials,
        });
      const response = await req.json();

      // If API responses 
      if (response) {

        // if response is error, log it
        if (response.error) {
          console.log(response.error);
        }
        
        // Save access token, if recived
        if (response.access_token) {
          localStorage.setItem("access_token", response.access_token);
        }
      }
    }

    // Credentias were not recived
    else {
      console.log("Credentias not received");
    }
  };

  // Get Register credentials
  function getUserRegisterData() {
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("passwd-confirm").value;
    if (password !== password2) {return false}
    return JSON.stringify({ username: userName, password: password });
  };
  
  // Get Login credentials
  function getUserLoginData() {
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    return JSON.stringify({ username: userName, password: password });
  };

  return (
    <form
      className="shadow-gray-500 shadow-2xl px-5 py-5"
      id="form"
    >
      <label>{loginLabel ? "login" : "sign up"}</label>
      <InputField id="username" type="text" placeholder="user name" />
      <InputField id="password" type="password" placeholder="password" />

      {/* additional field for signup  */}
      {/* only show when signup clicked */}
      <div className={fieldIsHidden ? "hidden" : ""}>
        <InputField id="passwd-confirm" type="password" placeholder="confirm password" />
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
            HandleFromSubmit={HandleFromSubmit}
          />
        </Link>
        <Button
          label={signUpLabel ? "sign in" : "sign up"}
          bgcolor="orange"
          signUpLabel={signUpLabel}
          setSignUpLabel={setSignUpLabel}
          loginLabel={loginLabel}
          setLoginLabel={setLoginLabel}
          fieldIsHidden={fieldIsHidden}
          setFieldIsHidden={setFieldIsHidden}
          color="rgb(31 41 55)"
          type='button'

        />
      </div>
    </form>
  );
};

export default LoginForm;
