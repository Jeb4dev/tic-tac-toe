// This is the cell component of gameboard
// 9 of this will give a full 3xe board
const GameCell = function ({
  getCellId,
  checkCellContent,
  checkWins,
  placeCellMarker,
}) {
  // toggle marker
  // const [marker, setMarker] = useState(true);
  let CrossMark, OhMark, placeMarker;

  CrossMark = "❌";
  OhMark = "⭕";

  // function to place marker in a cell
  const placeX = (cell) => (cell.target.textContent = CrossMark);
  const placeO = (cell) => (cell.target.textContent = OhMark);

  let marker = true;
  placeMarker = function (e) {
    marker = placeCellMarker();
    // console.log(marker);
    if (marker) {
      placeX(e);
    } else {
      placeO(e);
    }
  };

  // each grid cell is made up of a button
  return (
    <button
      className="
    mx-0 w-40 h-40 
  bg-gray-900
    text-center
    align-top
    focus:outline-none hover:bg-gray-800
    "
      // things to do when the button get's clicked

      onClick={(e) => {
        placeMarker(e);
        checkCellContent(e);
        getCellId(e);
        checkWins(getCellId(e), marker);
      }}
    >
      {}
    </button>
  );
};
export default GameCell;
