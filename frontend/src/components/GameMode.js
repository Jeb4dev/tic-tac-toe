import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Button from "./Button";

const GameMode = () => (
  <div>
    <div
      className="
        grid  justify-center
        border border-black  border-r
        px-5 py-5 "
    >
      <label
        className="
        text-center"
      >
        Choose Game Mode
      </label>
      <Link to="/game-board">
        <Button label="Single Player " />
        <Button label="Multiplayer" />
      </Link>
      <div
        className="
        flex justify-center"
      >
        <Link to="/login">
          <Button label={<BiArrowBack />} />
        </Link>
      </div>
    </div>
  </div>
);

export default GameMode;
