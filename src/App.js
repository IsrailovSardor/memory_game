import './App.css';
import Home from './componets/Home/Home';
import { Route, Routes } from 'react-router-dom'
import Game from './componets/Game/Game';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Routes>
        <Route path="/game" element={<Game/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
