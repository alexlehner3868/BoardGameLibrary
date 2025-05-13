import React, { useState } from "react";

export default function GameSuggestion({ allGames, categoryList }) {
  const [numPlayers, setNumPlayers] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [category, setCategory] = useState("");
  const [suggestedGame, setSuggestedGame] = useState(null);
  const [minRating, setMinRating] = useState("");
  const [numPlays, setNumPlays] = useState("");

  const ratings = [3, 2, 1, 0];
  const numPlaysList = ["Unplayed", "Played"];

  const handleSuggest = () => {
    const filteredGames = allGames.filter((game) => {
      const meetsPlayers = (numPlayers == "" ? true: numPlayers >= game.minPlayers && numPlayers <= game.maxPlayers);
      const meetsDuration = (maxDuration == "" ? true : maxDuration >= game.duration);


      var meetsRating;
      var meetsPlays;
      if(minRating == "" || minRating == "All"){
        meetsRating = true;
      }else if(game.rating >= minRating){
        meetsRating = true;
      }else{
        meetsRating = false;
      }

      if(numPlays == "" || numPlays == "All"){
        meetsPlays = true;
      }else if(numPlays == "Unplayed" && game.totalPlays == 0){
        meetsPlays = true;
      }else if(numPlays == "Played" && game.totalPlays > 0){
        meetsPlays = true;
      }else{
        meetsPlays = false;
      }
      const meetsCategory =
        !category ||
        (Array.isArray(game.category)
          ? game.category.includes(category)
          : game.category === category);
      return meetsPlayers && meetsDuration && meetsCategory && meetsRating && meetsPlays;
    });

    if (filteredGames.length === 0) {
      setSuggestedGame("No matching games found.");
    } else {
      const randomIndex = Math.floor(Math.random() * filteredGames.length);
      setSuggestedGame(filteredGames[randomIndex]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", padding: "2rem" }}>
      {/* Left 1/3 - Filters */}
      <div style={{ flex: "1", paddingRight: "2rem", borderRight: "1px solid #ccc" }}>
        <h2>Optional Filters</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Number of Players:
            <input
              type="number"
              value={numPlayers}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Max Duration (minutes):
            <input
              type="number"
              value={maxDuration}
              onChange={(e) => setMaxDuration(Number(e.target.value))}
              min="0"
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%" }}
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
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Number of Plays:
            <select
              value={numPlays}
              onChange={(e) => setNumPlays(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">All</option>
              {numPlaysList.map((pl) => (
                <option key={pl} value={pl}>
                  {pl}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Min Rating:
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">All</option>
              {ratings.map((rat) => (
                <option key={rat} value={rat}>
                  {rat + " Stars"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Right 2/3 - Suggestion button + results */}
      <div style={{ flex: "2", paddingLeft: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={handleSuggest}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              border: "2px solid #333",
              borderRadius: "8px",
              cursor: "pointer",
              background: "#f9f9f9",
            }}
          >
            Suggest a Game
          </button>
        </div>

        {suggestedGame && (
          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            {typeof suggestedGame === "string" ? (
              <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>{suggestedGame}</p>
            ) : (
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  {suggestedGame.title}
                </h2>
                <p><strong>Players:</strong> {suggestedGame.minPlayers}–{suggestedGame.maxPlayers}</p>
                <p><strong>Duration:</strong> {suggestedGame.duration} min</p>
                <p>
                  <strong>Category:</strong>{" "}
                  {Array.isArray(suggestedGame.category)
                    ? suggestedGame.category.join(", ")
                    : suggestedGame.category}
                </p>
                <p><strong>Rating:</strong> { "⭐".repeat(Number(suggestedGame.rating)) + "☆".repeat(3 - Number(suggestedGame.rating))}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
