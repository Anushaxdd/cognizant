import React from "react";

function IndianPlayers() {
  const players = [
    "Virat",
    "Rohit",
    "Gill",
    "Rahul",
    "Pant",
    "Hardik"
  ];

  const [p1, p2, p3, p4, p5, p6] = players;

  const oddPlayers = [p1, p3, p5];
  const evenPlayers = [p2, p4, p6];

  const T20players = ["Surya", "Tilak", "Rinku"];
  const RanjiPlayers = ["Pujara", "Rahane", "Iyer"];

  const mergedPlayers = [...T20players, ...RanjiPlayers];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Odd Team Players</h2>

      <ul>
        {oddPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Even Team Players</h2>

      <ul>
        {evenPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Merged Players</h2>

      <ul>
        {mergedPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default IndianPlayers;