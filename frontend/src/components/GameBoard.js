import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Button from "./Button";
import GameCell from "./GameCell";
import ScoreBoard from "./ScoreBoard";

// 3x3 grid tic tac toe gameBoard
const GameBoard = function () {
  function selectCells() {
    let cells = [];
    const board = document.getElementById("game-board");
    for (let i = 0; i < 9; i++) {
      cells.push(board.childNodes[i].firstChild);
    }
    return cells;
  }
  // Function to uniquely identify cell in grid
  const getCellId = function (cell) {
    const CellId = Number(cell.target.closest("div").getAttribute("data-id"));
    return CellId;
  };

  // function to check type of marker in cell x || O
  const checkCellContent = function (cell) {
    const marker = cell.target.textContent;
    if (marker === "❌" || " ⭕") {
      return `marker: ${marker}`;
    }
  };

  let marker = true;
  const placeCellMarker = function () {
    marker = !marker;
    return marker;
  };

  // function to determine a win
  // 2D array that contains all non empty values of the game
  let cellid = [];
  let winningPositions = [
    // horizontal wins
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // vertical wins
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // diagonal
    [1, 5, 9],
    [3, 5, 7],
  ];
  const checkWins = function (cellID, marker) {
    const id = cellID;
    let xValues = [];
    let oValues = [];
    let Currentmarker = marker;

    if (Currentmarker) {
      Currentmarker = "❌";
    } else {
      Currentmarker = "⭕";
    }

    // make array containing id and value of id
    let input = [id, Currentmarker];

    // Check if the array has array with current id
    // if it has, remove that value from array
    // this prevents duplicates
    cellid.forEach((e, i) => {
      if (e[0] === id) {
        cellid.splice(i);
      }
    });

    // push new value to array
    cellid.push(input);

    // print array
    cellid.forEach((e) => {
      if (e[1] === "❌") {
        xValues.push(e[0]);
      } else if (e[1] === "⭕") {
        oValues.push(e[0]);
      }
    });

    winningPositions.forEach((arr) => {
      const reward = function (winner) {
        const cells = selectCells();
        cells.forEach((cell, i) => {
          if (arr.includes(i + 1)) {
            const displayWinner = document.getElementById("winner-display");
            cell.style.opacity = "1";
            cell.style.backgroundColor = "rgb(31 41 55)";
            cell.textContent = `${winner}`;
            displayWinner.textContent = `${winner} WINS!!! 🥳 🎉 `;
          } else {
            // cell.style.opacity = "0";
            cell.style.backgroundColor = "rgb(17, 24, 39)";

            // remove click event
            // console.log(cell.parentElement);
            // cell.removeEventListener("click", placeCellMarker, true);
          }
        });
      };

      if (xValues.includes(arr[0]))
        if (xValues.includes(arr[1]))
          if (xValues.includes(arr[2])) {
            reward("❌");
          }

      if (oValues.includes(arr[0]))
        if (oValues.includes(arr[1]))
          if (oValues.includes(arr[2])) {
            reward("⭕");
          }
    });
  };

  // array to hold each cell in the grid
  const gameboard = Array.from({ length: 9 }, () => (
    <GameCell
      getCellId={getCellId}
      checkCellContent={checkCellContent}
      checkWins={checkWins}
      placeCellMarker={placeCellMarker}
    />
  ));

  const grid = gameboard.map(function (cell, index) {
    return (
      <div data-id={index + 1} key={index} className="my-0">
        {cell}
      </div>
    );
  });

  // function to clear || reset the entire game
  const reset = function () {
    cellid = [];
    const cells = selectCells();
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.opacity = "100";
    });
  };

  useEffect(() => {
    let score = 0;
    const cells = selectCells();
    cells.forEach(function (cell) {
      cell.addEventListener("click", incremetScore);
      function incremetScore() {
        let scores = document.getElementById("player1-score");
        return (scores.textContent = score += 1);
      }
    });
  });

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
        id="game-board"
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
