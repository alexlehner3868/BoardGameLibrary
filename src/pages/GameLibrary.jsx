import React, { useState, useEffect } from "react";
import GameList from "../components/GameList";
import GameForm from "../components/GameForm";
import "./GameLibrary.css";

export default function GameLibrary() {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("boardGames");
    const parsedGames = savedGames ? JSON.parse(savedGames) : [];
    return parsedGames;
  });

  const [formData, setFormData] = useState({
    title: "",
    minPlayers: "",
    maxPlayers: "",
    duration: "",
    category: "",
    rating: "",
  });

  const [error, setError] = useState("");

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

    setError(""); // Clear any existing error
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
        id: crypto.randomUUID(), // generate unique id
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

  return (
    <div className="game-library-container">
      <div className="game-list">
        <h2>Game Library</h2>
        <GameList games={games} setGames={setGames} />
      </div>

      <div className="game-form">
        <h2>Add New Game</h2>
        <GameForm
          formData={formData}
          onChange={handleChange} // onChange should be passed here
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}
