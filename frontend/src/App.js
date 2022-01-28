import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import { GiTicTacToe } from "react-icons/gi";
import LoginForm from "./components/LoginForm";
import GameMode from "./components/GameMode";
import GameBoard from "./components/GameBoard";

const App = function () {
  const [loginLabel, setLoginLabel] = useState(true);

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
