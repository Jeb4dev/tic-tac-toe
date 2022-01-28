import { BsFillPersonFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";

// scoreBoard component to display player gaming info
// :name :game type||mode :score
const ScoreBoard = (name) => (
  <div className="flex justify-between">
    {/* main player gameinfo */}
    <h1>
      {<BsFillPersonFill />}
      name
    </h1>
    {/* opponent info :bot || :peer */}
    <h1>
      {<FaRobot />}
      Bot || Peer
    </h1>
  </div>
);

export default ScoreBoard;
