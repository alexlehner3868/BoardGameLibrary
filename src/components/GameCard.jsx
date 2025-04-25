// src/components/GameCard.jsx
import React from "react";

export default function GameCard({ game }) {
  if (!game) return null;

 // Convert rating to emojis
 const renderRating = (rating) => {
    const stars = "⭐️".repeat(Math.round(rating));
    const empty = "☆".repeat(3 - Math.round(rating));
    return stars + empty;
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
      <h3>{game.title}</h3>
      <p><strong>Players:</strong> {game.minPlayers}–{game.maxPlayers}</p>
      <p><strong>Duration:</strong> {game.duration} min</p>
      <p><strong>Category:</strong> {Array.isArray(game.category) ? game.category.join(", ") : game.category}</p>
      <p><strong>Rating:</strong> {renderRating(game.rating)}</p>
    </div>
  );
}
