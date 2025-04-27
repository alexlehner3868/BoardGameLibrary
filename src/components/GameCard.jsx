import React, { useState } from "react";
import "./GameCard.css";

export default function GameCard({ game, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const [editedTitle, setEditedTitle] = useState(game.title);
  const [editedMinPlayers, setEditedMinPlayers] = useState(game.minPlayers);
  const [editedMaxPlayers, setEditedMaxPlayers] = useState(game.maxPlayers);
  const [editedDuration, setEditedDuration] = useState(game.duration);
  const [editedCategory, setEditedCategory] = useState(game.category);
  const [editedRating, setEditedRating] = useState(game.rating);

  const handleSave = () => {
    // Convert to numbers for validation
    const min = Number(editedMinPlayers);
    const max = Number(editedMaxPlayers);
    const duration = Number(editedDuration);

    // Validation checks
    if (isNaN(min) || isNaN(max)) {
      setError("Min and Max Players must be numbers.");
      return;
    }
    if (min > max) {
      setError("Min Players cannot be greater than Max Players.");
      return;
    }
    if (isNaN(duration) || duration < 0) {
      setError("Duration must be a number greater than or equal to 0.");
      return;
    }

    // Passed validation
    setError("");
    const updatedGame = {
      ...game,
      title: editedTitle,
      minPlayers: min,
      maxPlayers: max,
      duration,
      category: editedCategory,
      rating: editedRating,
    };

    console.log("Saving edited game:", updatedGame);
    onUpdate(updatedGame);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Deleting game:", game.id);
    onDelete(game.id);
  };

  const ratingDisplay =
    "⭐".repeat(Number(game.rating)) + "☆".repeat(3 - Number(game.rating));

  // Format the last played date if it exists
  const lastPlayedDate = game.lastPlayedDate
    ? new Date(game.lastPlayedDate).toLocaleDateString()
    : "N/A";

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
            right: "70px",
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
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            style={{ fontSize: "1.2rem", marginBottom: "0.5rem", width: "100%" }}
          />

          <p>
            <strong>Players:</strong>{" "}
            <input
              type="number"
              value={editedMinPlayers}
              onChange={(e) => setEditedMinPlayers(e.target.value)}
              placeholder="Min"
              style={{ width: "60px", marginRight: "0.5rem" }}
            />
            –
            <input
              type="number"
              value={editedMaxPlayers}
              onChange={(e) => setEditedMaxPlayers(e.target.value)}
              placeholder="Max"
              style={{ width: "60px", marginLeft: "0.5rem" }}
            />
          </p>

          <p>
            <strong>Duration:</strong>{" "}
            <input
              type="number"
              value={editedDuration}
              onChange={(e) => setEditedDuration(e.target.value)}
              placeholder="Duration"
              style={{ width: "80px" }}
            />{" "}
            min
          </p>

          <p>
            <strong>Category:</strong>{" "}
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              placeholder="Category"
              style={{ width: "60%" }}
            />
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            <input
              type="number"
              value={editedRating}
              min="0"
              max="3"
              step="0.5"
              onChange={(e) => setEditedRating(e.target.value)}
              style={{ width: "60px" }}
            />
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <>
          <h3>{game.title}</h3>
          <p>
            <strong>Players:</strong> {game.minPlayers} – {game.maxPlayers}
          </p>
          <p>
            <strong>Duration:</strong> {game.duration} min
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {Array.isArray(game.category) ? game.category.join(", ") : game.category}
          </p>
          <p>
            <strong>Rating:</strong> {ratingDisplay}
          </p>
          <p>Num Plays: {game.totalPlays}</p>
          <p>Last Played: {lastPlayedDate}</p>
        </>
      )}
    </div>
  );
}
