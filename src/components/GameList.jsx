import React, { useState, useRef, useEffect } from "react";
import GameCard from "./GameCard";
import "./GameCard.css";

export default function GameList({ games = [], setGames, categoryList }) {
  const numPlaysList = ["Unplayed", "Played"];

  const [showFilters, setShowFilters] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numPlayersFilter, setNumPlayersFilter] = useState("");
  const [maxDurationFilter, setMaxDurationFilter] = useState("");
  const [numPlaysFilter, setNumPlaysFilter] = useState("");
  const [sortOption, setSortOption] = useState("alphabetical");

  const filteredGames = games.filter((game) => {
    const gameTitle = Array.isArray(game.title)
      ? game.title.join(", ")
      : game.title || "";
    const matchesTitle =
      titleFilter === "" ||
      gameTitle.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRating =
      minRatingFilter === "" || game.rating >= Number(minRatingFilter);
    const matchesNumPlayers =
      numPlayersFilter === "" ||
      numPlayersFilter === 0 ||
      (game.minPlayers <= numPlayersFilter &&
        game.maxPlayers >= numPlayersFilter);
    const matchesCategory =
      selectedCategory === "" ||
      (Array.isArray(game.category)
        ? game.category.includes(selectedCategory)
        : game.category === selectedCategory);
    const matchesDuration =
      maxDurationFilter === 0 ||
      maxDurationFilter === "" ||
      maxDurationFilter >= game.duration;

    let matchesNumPlays = true;
    if (numPlaysFilter === "Unplayed") {
      matchesNumPlays = game.totalPlays === 0;
    } else if (numPlaysFilter === "Played") {
      matchesNumPlays = game.totalPlays > 0;
    }

    return (
      matchesTitle &&
      matchesRating &&
      matchesNumPlayers &&
      matchesDuration &&
      matchesCategory &&
      matchesNumPlays
    );
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOption) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "rating":
        return b.rating - a.rating;
      case "mostPlays":
        return b.totalPlays - a.totalPlays;
      case "leastPlays":
        return a.totalPlays - b.totalPlays;
      case "mostRecent":
        return new Date(b.lastPlayedDate || 0) - new Date(a.lastPlayedDate || 0);
      case "leastRecent":
        return new Date(a.lastPlayedDate || 0) - new Date(b.lastPlayedDate || 0);
      default:
        return 0;
    }
  });

  const handleUpdate = (updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  const handleDelete = (gameId) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  };

  return (
    <div>
      {/* Top bar: Filter toggle + Sort options */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          {showFilters ? "x" : "≡"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="sortSelect"><strong>Sort by:</strong></label>
          <select
            id="sortSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "0.4rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              minWidth: "180px",
            }}
          >
            <option value="alphabetical">Alphabetical (A–Z)</option>
            <option value="mostRecent">Most Recently Played</option>
            <option value="leastRecent">Least Recently Played</option>
            <option value="mostPlays">Most Plays</option>
            <option value="leastPlays">Least Plays</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Filters Section (Collapsible) */}
      {showFilters && (
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <label>
            Title:
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
          <label>
            Num Players:
            <input
              type="number"
              min="1"
              value={numPlayersFilter}
              onChange={(e) => setNumPlayersFilter(Number(e.target.value))}
              style={{ marginLeft: "0.5rem", width: "50px" }}
            />
          </label>
          <label>
            Max Duration:
            <input
              type="number"
              min="1"
              value={maxDurationFilter}
              onChange={(e) => setMaxDurationFilter(Number(e.target.value))}
              style={{ marginLeft: "0.5rem", width: "50px" }}
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
          <label>
            Plays:
            <select
              value={numPlaysFilter}
              onChange={(e) => setNumPlaysFilter(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="">All</option>
              {numPlaysList.map((np) => (
                <option key={np} value={np}>
                  {np}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Game cards */}
      {sortedGames.length === 0 ? (
        <p>No games match your filters.</p>
      ) : (
        sortedGames.map((game) => (
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
