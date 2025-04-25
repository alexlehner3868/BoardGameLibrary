// src/components/GameList.jsx
import React, { useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ games = [] }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  const filteredGames = games.filter((game) => {
    const gameTitle = Array.isArray(game.title)
      ? game.title.join(", ")
      : (game.title || "");

    const matchesTitle =
      titleFilter === "" ||
      gameTitle.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesRating = game.rating >= minRatingFilter;
    return matchesTitle && matchesRating;
  });

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
        filteredGames.map((game, index) => <GameCard key={index} game={game} />)
      )}
    </div>
  );
}
