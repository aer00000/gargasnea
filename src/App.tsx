import { BrowserRouter, Route, Routes } from 'react-router';

import Login from './Login.tsx';
import PlayScreen from './PlayScreen.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playscreen" element={<PlayScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
