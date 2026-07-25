import React from "react";

function ListofPlayers() {
  const players = [
    { name: "Virat", score: 95 },
    { name: "Rohit", score: 88 },
    { name: "Gill", score: 78 },
    { name: "Rahul", score: 65 },
    { name: "Pant", score: 91 },
    { name: "Hardik", score: 69 },
    { name: "Jadeja", score: 74 },
    { name: "Ashwin", score: 60 },
    { name: "Shami", score: 82 },
    { name: "Bumrah", score: 58 },
    { name: "Siraj", score: 72 }
  ];

  const below70 = players.filter(player => player.score < 70);

  return (
    <div style={{ padding: "20px" }}>
      <h1>List of Players</h1>

      <h3>All Players</h3>

      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>

      <h3>Players with Score Below 70</h3>

      <ul>
        {below70.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListofPlayers;