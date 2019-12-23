import React from "react";

const SquadPlayer = ({ age, assists, goals, number, name, position }) => {
  return (
    <div className="squad__player">
      <p>{name}</p>
      <p>{number}</p>
      <p>{position}</p>
      <p>{age}</p>
      <p>{goals}</p>
      <p>{assists}</p>
    </div>
  );
};

export default SquadPlayer;
