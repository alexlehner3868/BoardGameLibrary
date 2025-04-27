import React, { useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ games = [], setGames , categoryList}) {
  const [showFilters, setShowFilters] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log("Current games in GameList:", games);

  const filteredGames = games.filter((game) => {
    const gameTitle = Array.isArray(game.title)
      ? game.title.join(", ")
      : game.title || "";

    const matchesTitle =
      titleFilter === "" ||
      gameTitle.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesRating =
      minRatingFilter === "" || Number(game.rating) >= Number(minRatingFilter);

    const matchesCategory =
      selectedCategory === "" ||
      (Array.isArray(game.category)
        ? game.category.includes(selectedCategory)
        : game.category === selectedCategory);

    return matchesTitle && matchesRating && matchesCategory;
  });

  const handleUpdate = (updatedGame) => {
    console.log("Updating game:", updatedGame);
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  const handleDelete = (gameId) => {
    console.log("Deleting game with id:", gameId);
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  };

  return (
    <div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        style={{ marginBottom: "1rem" }}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
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
              onChange={(e) => setMinRatingFilter(e.target.value)}
              style={{ marginLeft: "0.5rem", width: "50px" }}
              placeholder="0–3"
            />
          </label>
          <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="">All</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {filteredGames.length === 0 ? (
        <p>No games match your filters.</p>
      ) : (
        filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
