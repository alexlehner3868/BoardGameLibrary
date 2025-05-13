import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameLibrary from './pages/GameLibrary';
import Wishlist from './pages/Wishlist';
import Stats from './pages/Stats';
import GameSuggestion from './pages/GameSuggestion';
const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/Game Suggestion" element ={<GameSuggestion/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
