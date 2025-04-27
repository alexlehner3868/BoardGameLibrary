import React, { useState } from "react";

export default function LogPlayForm({ games, setGames }) {
  const [playLog, setPlayLog] = useState({
    selectedGameId: "",
    playDate: "",
    newRating: "",
  });

  const handlePlayLogChange = (e) => {
    const { name, value } = e.target;
    setPlayLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogPlaySubmit = (e) => {
    e.preventDefault();
    if (!playLog.selectedGameId || !playLog.playDate) {
      alert("Please select a game and enter a play date.");
      return;
    }

    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === playLog.selectedGameId
          ? {
              ...game,
              totalPlays: game.totalPlays + 1, // Increment play count
              lastPlayedDate: playLog.playDate, // Update the most recent play date
              rating: playLog.newRating !== "" ? playLog.newRating : game.rating, // Update rating if provided
            }
          : game
      )
    );

    alert("Game play logged!");
    setPlayLog({ selectedGameId: "", playDate: "", newRating: "" });
  };

  return (
    <form onSubmit={handleLogPlaySubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <label>
        Select Game:
        <select
          name="selectedGameId"
          value={playLog.selectedGameId}
          onChange={handlePlayLogChange}
        >
          <option value="">--Select a game--</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </select>
      </label>

      <label>
        Play Date:
        <input
          type="date"
          name="playDate"
          value={playLog.playDate}
          onChange={handlePlayLogChange}
        />
      </label>

      <label>
        New Rating (optional):
        <input
          type="number"
          name="newRating"
          min="0"
          max="3"
          value={playLog.newRating}
          onChange={handlePlayLogChange}
          placeholder="0-3"
        />
      </label>

      <button type="submit">Log Play</button>
    </form>
  );
}
