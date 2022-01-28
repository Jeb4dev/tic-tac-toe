import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import GameCell from "./GameCell";
import ScoreBoard from "./ScoreBoard";

// 3x3 grid tic tac toe gameBoard
const GameBoard = function () {
  // Function to uniquely identify cell in grid
  const getCellId = function (cell) {
    const CellId = Number(cell.target.closest("div").getAttribute("data-id"));
    console.log(CellId);
    return CellId;
  };

  // array to hold each cell in the grid
  // purposely to auto generate rather than stamp 9 cells
  const gameboard = Array.from({ length: 9 }, () => (
    <GameCell getCellId={getCellId} />
  ));

  const grid = gameboard.map(function (cell, index) {
    return (
      <div data-id={index + 1} key={index} className="my-0">
        {cell}
      </div>
    );
  });

  // function to clear || reset the entire game
  const reset = function (grid, cell) {
    grid.forEach((element) => {
      console.log(element.type);
    });
  };
  return (
    <div>
      <div>
        <h1
          className="flex justify-center
          font-black text-3xl py-4"
        >
          Tic Tac Toe
        </h1>
      </div>

      {/* // display players gameinfo :name :score : gamemode */}
      <ScoreBoard name="playerName" />
      <div
        className="
      grid grid-cols-3 grid-rows-3
      justify-center items-start "
      >
        {/* Generate the 3x3 grid  */}
        {grid}
      </div>

      {/* Buttons to reset || exit game */}
      <div className="flex justify-between">
        <Button
          label="reset"
          bgcolor="orange"
          color="rgb(31 41 55)"
          reset={reset}
          grid={grid}
        />
        <Link to="/">
          <Button label="exit" bgcolor="salmon" color="rgb(31 41 55)" />
        </Link>
      </div>
    </div>
  );
};

export default GameBoard;
