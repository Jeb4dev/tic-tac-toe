import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";
import { GiTicTacToe } from "react-icons/gi";
import LoginForm from "./components/LoginForm";
import GameMode from "./components/GameMode";
import GameBoard from "./components/GameBoard";

let endPoint = "http://localhost:8000";

let socket = io.connect(`${endPoint}`)

const App = function () {
  const [loginLabel, setLoginLabel] = useState(true);
  
  function getApiAndEmit() {
    console.log("Click");
    socket.emit('recive_text', 'what is going on');
  }

  socket.on("cl_send_text", (txt) => {console.log(txt)})

  return (
    <Router>
      <div
        className="
      
    h-screen max-w-md 
    mx-auto flex flex-col justify-center
    items-center text-gray-400 "
      >
        <div className="my-5">
          <h1 className="text-5xl ">{<GiTicTacToe />}</h1>
        </div>

        <Switch>
          <Route
            path="/"
            element={
              <LoginForm
                loginLabel={loginLabel}
                setLoginLabel={setLoginLabel}
                Emit={getApiAndEmit}
              />
            }
          />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/game-board" element={<GameBoard />} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
