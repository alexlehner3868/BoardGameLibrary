import React, { useState } from "react";
import GameCard from "./GameCard";
import "./GameCard.css";

export default function GameList({ games = [], setGames , categoryList}) {
  const [showFilters, setShowFilters] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numPlayersFilter, setNumPlayersFilter] = useState("");
  const [maxDurationFilter, setMaxDurationFilter] = useState("");

  const filteredGames = games.filter((game) => {
    const gameTitle = Array.isArray(game.title)  ? game.title.join(", ") : game.title || "";
    const matchesTitle = titleFilter === "" || gameTitle.toLowerCase().includes(titleFilter.toLowerCase());
   
    const matchesRating = minRatingFilter === "" || game.rating >= Number(minRatingFilter);
    const matchesNumPlayers = numPlayersFilter === "" || numPlayersFilter=== 0 || ((game.minPlayers <= numPlayersFilter) && (game.maxPlayers >= numPlayersFilter));
    const matchesCategory =  selectedCategory === "" || (Array.isArray(game.category) ? game.category.includes(selectedCategory)  : game.category === selectedCategory);
    const matchesDuration = maxDurationFilter === 0 || maxDurationFilter === "" || maxDurationFilter >= game.duration;
    return matchesTitle && matchesRating && matchesNumPlayers && matchesDuration && matchesCategory;
    
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
         onClick={() => setShowFilters((prev) => !prev)}
         style={{
           marginBottom: "1rem",
           padding: "0.5rem 1rem",
           backgroundColor: "#eee",
           border: "1px solid #ccc",
           borderRadius: "6px",
         }}
       >
         {showFilters ? "x" : "≡"}
       </button>
 
       {showFilters && (
         <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
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
               onChange={(e) => setMinRatingFilter(Number(e.target.value))}
               style={{ marginLeft: "0.5rem", width: "50px" }}
             />
           </label>
           <label>
             Num Players:
             <input
               type="number"
               min="1"
               max="1000000000000"
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
               max="1000000000000"
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
