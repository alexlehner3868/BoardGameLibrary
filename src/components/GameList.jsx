// src/components/GameList.jsx
import React from "react";

const GameCard = ({ game }) => (
  <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
    <h3>{game.title}</h3>
    <p><strong>Players:</strong> {game.minPlayers}–{game.maxPlayers}</p>
    <p><strong>Duration:</strong> {game.duration} min</p>
    <p><strong>Category:</strong> {game.category}</p>
    <p><strong>Rating:</strong> {game.rating}/3</p>
  </div>
);

export default function GameList({ games }) {
  return (
    <div>
      <h2>Game Library</h2>
      {games.length === 0 ? (
        <p>No games added yet.</p>
      ) : (
        games.map((game, index) => <GameCard key={index} game={game} />)
      )}
    </div>
  );
}
