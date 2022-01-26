import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import GameMode from "./components/GameMode";
import GameBoard from "./components/GameBoard";

const App = () => {
  return (
    <Router>
      <div className="h-screen max-w-md mx-auto flex justify-center items-center ">
        <Switch>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/game-board" element={<GameBoard />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
