import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { BiArrowBack } from "react-icons/bi";

const GameMode = () => {
  return (
    <div>
      <div className="border border-black border-r px-5 py-5 grid justify-center ">
        <label className="text-center">Choose Game Mode</label>
        <Link to="/game-board">
          <Button label="Single Player " />
          <Button label="Multiplayer" />
        </Link>
        <div className="flex justify-center">
          <Link to="/login">
            <Button label={<BiArrowBack />} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
