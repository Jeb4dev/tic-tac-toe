import { BsFillPersonFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";

// scoreBoard component to display player gaming info
// :name :game type||mode :score
const ScoreBoard = ({ name }) => (
  <div className="flex justify-between">
    <h1>
      {<BsFillPersonFill />}
      {name}
      <p>
        Score : <span id="player1-score"></span>{" "}
      </p>
    </h1>
    <h1 id="winner-display">{}</h1>
    <h1>
      {<FaRobot />}
      {name}
      <p>
        Score : <span id="player2-score"></span>{" "}
      </p>
    </h1>
  </div>
);

export default ScoreBoard;
