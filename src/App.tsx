import { BrowserRouter, Route, Routes } from 'react-router';

import LeaderBoard from './LeaderBoard.tsx';
import Login from './Login.tsx';
import PlayScreen from './PlayScreen.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playscreen" element={<PlayScreen />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
