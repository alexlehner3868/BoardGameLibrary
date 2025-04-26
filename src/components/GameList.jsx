import React, { useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ games = [], setGames }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  console.log("Current games in GameList:", games); // log to check the games passed to GameList

  const filteredGames = games.filter((game) => {
    const gameTitle = Array.isArray(game.title)
      ? game.title.join(", ")
      : game.title || "";

    const matchesTitle =
      titleFilter === "" ||
      gameTitle.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesRating = game.rating >= minRatingFilter;
    return matchesTitle && matchesRating;
  });

  console.log("Filtered games:", filteredGames); // log to check the filtered games

  const handleUpdate = (updatedGame) => {
    console.log("Updating game:", updatedGame); // log the updated game
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  const handleDelete = (gameId) => {
    console.log("Deleting game with id:", gameId); // log the game being deleted
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <label>
          Filter by Title:
          <input
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="e.g. Hive"
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <label>
          Min Rating:
          <input
            type="number"
            min="0"
            max="3"
            value={minRatingFilter}
            onChange={(e) => setMinRatingFilter(Number(e.target.value))}
            style={{ marginLeft: "0.5rem", width: "50px" }}
          />
        </label>
      </div>

      {filteredGames.length === 0 ? (
        <p>No games match your filters.</p>
      ) : (
        filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onUpdate={handleUpdate}
            onDelete={handleDelete} // Pass onDelete to GameCard
          />
        ))
      )}
    </div>
  );
}
