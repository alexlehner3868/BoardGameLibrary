// src/components/GameForm.jsx
import React from "react";

export default function GameForm({ formData, onChange, onSubmit, error }) {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="title"
          value={formData.title}
          onChange={onChange} // onChange should be passed correctly
          placeholder="Title"
          required
        />
        <input
          name="minPlayers"
          value={formData.minPlayers}
          onChange={onChange} // onChange should be passed correctly
          placeholder="Min Players"
          type="number"
          required
        />
        <input
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={onChange} // onChange should be passed correctly
          placeholder="Max Players"
          type="number"
          required
        />
        <input
          name="duration"
          value={formData.duration}
          onChange={onChange} // onChange should be passed correctly
          placeholder="Duration (min)"
          type="number"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={onChange} // onChange should be passed correctly
          placeholder="Category"
          required
        />
        <input
          name="rating"
          value={formData.rating}
          onChange={onChange} // onChange should be passed correctly
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
