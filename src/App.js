import './App.css';
import Home from './componets/Home/Home';
import { Route, Router, Routes } from 'react-router-dom'
import Game from './componets/Game/Game';
import LeaderBoard from './componets/Leaderboard/LeaderBoard';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
  );
}

export default App;
