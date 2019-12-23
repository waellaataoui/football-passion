import React from "react";
const StandingsTeam = (props) => {
  const { name, played, total, goalsdifference, teamid } = props.team;
  const highlighted = teamid === props.selectedTeam ? "highlighted" : "";
  return (
    <div className={`standings-line ${highlighted}`}>
      <p>{` ${props.index + 1} - ${name} `}</p>
      <p> {total} </p>
      <p>{played}</p>
      <p>{goalsdifference} </p>
    </div>
  );
};
export default StandingsTeam;
