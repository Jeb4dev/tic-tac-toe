import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";

const LoginForm = () => (
  <div
    className="
  border border-black border-r
  px-5 py-5"
  >
    <label>Login</label>
    <InputField type="text" placeholder="user name" />
    <InputField type="password" placeholder="password" />
    <div
      className="
    flex justify-around"
    >
      <Link to="/game-mode">
        <Button label={<FaSignInAlt />} />
      </Link>
      <Button label="sign up" />
    </div>
  </div>
);

export default LoginForm;
