import React, { useState } from "react";

export default function GameCard({ game, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(game.title);

  const handleSave = () => {
    console.log("Saving edited game:", { ...game, title: editedTitle }); // log when saving
    onUpdate({ ...game, title: editedTitle }); // Only update this game
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Deleting game:", game.id); // log when deleting
    onDelete(game.id); // Delete this game by its id
  };

  var ratingString = "⭐".repeat(Number(game.rating));
  ratingString += "☆".repeat(3-Number(game.rating));


 
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
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
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

      {isEditing && (
        <button
          onClick={handleDelete}
          style={{
            position: "absolute",
            top: "10px",
            right: "70px", // position to the left of the Save button
            fontSize: "0.8rem",
            padding: "0.2rem 0.5rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      )}

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
        <strong>Category:</strong>{" "}
        {Array.isArray(game.category) ? game.category.join(", ") : game.category}
      </p>
      <p>
        <strong>Rating:</strong> {ratingString}
      </p>
    </div>
  );
}
