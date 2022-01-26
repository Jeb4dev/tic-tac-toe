import React from "react";
import GameCell from "./GameCell";

const GameBoard = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 ">
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
        <GameCell />
      </div>
    </div>
  );
};

export default GameBoard;
