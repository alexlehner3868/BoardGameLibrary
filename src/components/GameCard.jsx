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
    <div className="game-card">
      <button
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
        className="edit-button"
      >
        {isEditing ? "Save" : "Edit"}
      </button>

      {isEditing && (
        <button
          onClick={handleDelete}
          className="delete-button"
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
            className="input-field"
          />

          <div className="section">
            <strong>Players:</strong>
            <input
              type="number"
              value={editedMinPlayers}
              onChange={(e) => setEditedMinPlayers(e.target.value)}
              placeholder="Min"
            />
            –
            <input
              type="number"
              value={editedMaxPlayers}
              onChange={(e) => setEditedMaxPlayers(e.target.value)}
              placeholder="Max"
            />
          </div>

          <div className="section">
            <strong>Duration:</strong>
            <input
              type="number"
              value={editedDuration}
              onChange={(e) => setEditedDuration(e.target.value)}
              placeholder="Duration"
            />
            min
          </div>

          <div className="section category-rating-separator">
            <strong>Category:</strong>
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              placeholder="Category"
            />
          </div>

          <div className="section">
            <strong>Rating:</strong>
            <input
              type="number"
              value={editedRating}
              min="0"
              max="3"
              step="0.5"
              onChange={(e) => setEditedRating(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <>
          <h3>{game.title}</h3>

          <div className="section">
            <strong>Players:</strong> {game.minPlayers} – {game.maxPlayers}
          </div>

          <div className="section">
            <strong>Duration:</strong> {game.duration} min
          </div>

          <div className="section">
            <strong>Category:</strong>{" "}
            {Array.isArray(game.category) ? game.category.join(", ") : game.category}
          </div>

          {/* Dotted line only between Category and Rating */}
          <div className="section category-rating-separator">
            <strong>Rating:</strong> {ratingDisplay}
          </div>

          <div className="section">
            <strong>Num Plays:</strong> {game.totalPlays}
          </div>

          <div className="section">
            <strong>Last Played:</strong> {lastPlayedDate}
          </div>
        </>
      )}
    </div>
  );
}
