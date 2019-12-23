import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import StandingsTeam from "./StandingsTeam";
const StandingsList = (props) => {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(false);
  const loading = standings === null;
  useEffect(() => {
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${props.context.leagueID}&s=${props.context.seasonID}
`
      )
      .then((res) => {
        return res.data;
      })
      .then((standings) => {
        setStandings(standings.table);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);
  return (
    <>
      <h1>Standings:</h1>
      <Spinner loading={loading}></Spinner>
      {!loading && !error && props.context.seasonID ? (
        <>
          <div className="standings-line">
            <p>Club:</p>
            <p>points:</p>
            <p>played:</p>
            <p>goals diff:</p>
          </div>
          {/* add a highlighter for selected team */}
          {standings.map((team, index) => (
            <StandingsTeam
              key={team.teamid}
              team={team}
              selectedTeam={props.context.teamID}
              index={index}
            ></StandingsTeam>
          ))}
        </>
      ) : null}
      {error && <p className="error">No Info Available</p>}
    </>
  );
};
export default StandingsList;
