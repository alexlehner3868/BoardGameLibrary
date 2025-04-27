import React, { useState, useEffect } from "react";
import GameList from "../components/GameList";
import GameForm from "../components/GameForm";
import LogPlayForm from "../components/LogPlayForm";
import "./GameLibrary.css";

export default function GameLibrary() {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("boardGames");
    const parsedGames = savedGames ? JSON.parse(savedGames) : [];
    return parsedGames.map((game) => ({
      ...game,
      totalPlays: game.totalPlays || 0,  // Set default value of 0 for totalPlays
    }));
  });

  const [formData, setFormData] = useState({
    title: "",
    minPlayers: "",
    maxPlayers: "",
    duration: "",
    category: "",
    rating: "",
  });

  const categoryList = ["Party", "Strategy", "Card", "Children", "Push Your Luck", "Dexterity", "Engine Builder", "Dice"];
  const [error, setError] = useState("");
  
  const [showAddGameForm, setShowAddGameForm] = useState(false);
  const [showLogGameForm, setShowLogGameForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("boardGames", JSON.stringify(games));
  }, [games]);

  const validateForm = () => {
    const { minPlayers, maxPlayers, duration, rating } = formData;

    if (Number(minPlayers) > Number(maxPlayers)) {
      setError("Min Players cannot be greater than Max Players.");
      return false;
    }

    if (minPlayers <= 0 || maxPlayers <= 0 || duration <= 0 || rating < 0 || rating > 3) {
      setError("Please enter valid numbers (greater than 0 for players and duration, 0-3 for rating).");
      return false;
    }

    setError(""); 
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newGame = {
        ...formData,
        id: crypto.randomUUID(),
        totalPlays: 0, // Initialize play count
        lastPlayedDate: "", // Initialize last played date
      };
      setGames([...games, newGame]);
      setFormData({
        title: "",
        minPlayers: "",
        maxPlayers: "",
        duration: "",
        category: "",
        rating: "",
      });
    }
  };

  const toggleAddGameForm = () => {
    if (showAddGameForm) {
      setShowAddGameForm(false);
    } else {
      setShowAddGameForm(true);
      setShowLogGameForm(false);
    }
  };

  const toggleLogGameForm = () => {
    if (showLogGameForm) {
      setShowLogGameForm(false);
    } else {
      setShowLogGameForm(true);
      setShowAddGameForm(false);
    }
  };

  return (
    <div className="game-library-container">
      <div className="game-list">
        <h2>Game Library</h2>
        <GameList games={games} setGames={setGames} categoryList={categoryList} />
      </div>

      <div className="game-form">
        <button onClick={toggleAddGameForm} className="add-game-btn">
          {showAddGameForm ? "Hide Add Game Form" : "Add Game"}
        </button>
        <button onClick={toggleLogGameForm} className="log-play-btn">
          {showLogGameForm ? "Hide Log Play Form" : "Log Played"}
        </button>

        {showAddGameForm && (
          <>
            <h2>Add New Game</h2>
            <GameForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              error={error}
              categoryList={categoryList}
            />
          </>
        )}

        {showLogGameForm && (
          <>
            <h2>Log Game Play</h2>
            <LogPlayForm games={games} setGames={setGames} />
          </>
        )}
      </div>
    </div>
  );
}
