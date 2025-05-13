import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import GameLibrary from './pages/GameLibrary';
import Wishlist from './pages/Wishlist';
import Stats from './pages/Stats';
import GameSuggestion from './pages/GameSuggestion';

const App = () => {
  const [games, setGames] = useState(() => {
      const savedGames = localStorage.getItem("boardGames");
      const parsedGames = savedGames ? JSON.parse(savedGames) : [];
      return parsedGames.map((game) => ({
        ...game,
        totalPlays: game.totalPlays || 0,  // Set default value of 0 for totalPlays
      }));
    });

  const categoryList = ["Party", "Strategy", "Card", "Children", "Push Your Luck", "Dexterity", "Engine Builder", "Dice"];

  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<GameLibrary games={games} setGames={setGames} categoryList={categoryList}/>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/Game Suggestion" element ={<GameSuggestion allGames={games} categoryList={categoryList}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
