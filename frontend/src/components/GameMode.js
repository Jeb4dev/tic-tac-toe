import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Button from "./Button";

// Component to determine gaming mode :single Player  :multiplayer
const GameMode = () => (
  <div>
    <div
      className="
        grid  justify-center shadow-gray-500 shadow-2xl
        px-5 py-5 "
    >
      <label
        className="
        text-center"
      >
        Choose Game Mode
      </label>
      <Link to="/game-board">
        <Button label="Single Player " bgcolor="teal" color="rgb(31 41 55)" />
        <Button label="Multiplayer" bgcolor="salmon" color="rgb(31 41 55)" />
      </Link>
      <div
        className="
        flex justify-center"
      >
        {/* button to go back to login screen */}
        <Link to="/">
          <Button
            label={<BiArrowBack />}
            bgcolor="orange"
            color="rgb(31 41 55)"
          />
        </Link>
      </div>
    </div>
  </div>
);

export default GameMode;
