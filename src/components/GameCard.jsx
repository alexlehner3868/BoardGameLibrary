import React, { useState } from "react";

export default function GameCard({ game, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(game.title);

  // Handle saving the edited title
  const handleSave = () => {
    onUpdate({ ...game, title: editedTitle }); // Only update the game being edited
    setIsEditing(false); // Close the edit mode
   
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        backgroundColor: isEditing ? "#f0f0f0" : "white",
        position: "relative",
      }}
    >
      <button
        onClick={isEditing ? handleSave : () => setIsEditing(true)} // Toggle between Edit and Save
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "0.8rem",
          padding: "0.2rem 0.5rem",
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        />
      ) : (
        <h3>{game.title}</h3>
      )}

      <p>
        <strong>Players:</strong> {game.minPlayers}–{game.maxPlayers}
      </p>
      <p>
        <strong>Duration:</strong> {game.duration} min
      </p>
      <p>
        <strong>Category:</strong> {Array.isArray(game.category) ? game.category.join(", ") : game.category}
      </p>
      <p>
        <strong>Rating:</strong> {"⭐".repeat(Number(game.rating))}
      </p>
    </div>
  );
}
