// src/pages/GameLibrary.jsx
import React, { useState, useEffect } from "react";
import GameList from "../components/GameList";
import GameForm from "../components/GameForm";

export default function GameLibrary() {
  // Load games from localStorage or use an empty array if not found
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("boardGames");
    return savedGames ? JSON.parse(savedGames) : [];
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

  // Update localStorage whenever games list changes
  useEffect(() => {
    localStorage.setItem("boardGames", JSON.stringify(games));
  }, [games]);

  const validateForm = () => {
    const { minPlayers, maxPlayers, duration, rating } = formData;

    // Validate minPlayers <= maxPlayers
    if (Number(minPlayers) > Number(maxPlayers)) {
      setError("Min Players cannot be greater than Max Players.");
      return false;
    }

    // Validate all inputs are positive numbers and rating is between 0 and 3
    if (minPlayers <= 0 || maxPlayers <= 0 || duration <= 0 || rating < 0 || rating > 3) {
      setError("Please enter valid numbers (greater than 0 for players and duration, 0-3 for rating).");
      return false;
    }

    // Clear any existing error
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
      setGames((prev) => [...prev, formData]); // Add the new game to the list
      setFormData({ title: "", minPlayers: "", maxPlayers: "", duration: "", category: "", rating: "" }); // Reset the form
    }
  };

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <div style={{ flex: 2, paddingRight: "2rem" }}>
        <GameList games={games} />
      </div>
      <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "2rem" }}>
        <GameForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
}
