import { useState } from "react";
// This is the cell component of gameboard
// 9 of this will give a full 3xe board
const GameCell = function ({ getCellId }) {
  // toggle marker
  const [markerPlaced, setMarkerPlaced] = useState(false);

  // function to place marker in a cell
  const placeMarker = function (cell) {
    // place either an x or o in the cell with a click
    cell.target.textContent = markerPlaced ? " ❌" : " ⭕";
  };

  // each grid cell is made up of a button
  return (
    <button
      className="
    mx-0 w-40 h-40 
  bg-gray-900
    text-center
    align-top
    focus:outline-none hover:bg-red-400
    "
      // things to do when the button get's clicked
      onClick={(e) => {
        // place marker
        placeMarker(e);
        // toggle marker
        setMarkerPlaced(!markerPlaced);
        // check cell value
        getCellId(e);
      }}
    >
      {}
    </button>
  );
};
export default GameCell;
