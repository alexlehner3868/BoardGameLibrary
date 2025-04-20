// src/components/GameForm.jsx
import React from "react";

export default function GameForm({ formData, onChange, onSubmit, error }) {
  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Title"
          required
        />
        <input
          name="minPlayers"
          value={formData.minPlayers}
          onChange={onChange}
          placeholder="Min Players"
          type="number"
          required
        />
        <input
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={onChange}
          placeholder="Max Players"
          type="number"
          required
        />
        <input
          name="duration"
          value={formData.duration}
          onChange={onChange}
          placeholder="Duration (min)"
          type="number"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={onChange}
          placeholder="Category"
          required
        />
        <input
          name="rating"
          value={formData.rating}
          onChange={onChange}
          placeholder="Rating (0–3)"
          type="number"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}
