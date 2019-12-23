import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import SquadPlayer from "./SquadPlayer";
import SquadSideliner from "./SquadSideliner";
const Squad = (props) => {
  const state = useContext(Context);
  const [injuries, setInjuries] = useState(null);
  const [squad, setSquad] = useState(null);
  const [error, seterror] = useState(false);
  const loading = squad === null || injuries === null;

  useEffect(() => {
    axios
      .get(
        `https://data.football-api.com/v3/teams/${state.teamID2}?Authorization=cfnR6LWc4i4MDFLlPJrajoa465c4qjF594kpIy4b
  `
      )
      .then((res) => res.data[0])
      .then((profile) => {
        setSquad(profile.squad);
        setInjuries(profile.sidelined);
      })
      .catch((err) => {
        seterror(true);
      });
  }, []);
  return (
    <div>
      <div>
        <BackButton history={props.history}></BackButton>
      </div>
      <Spinner loading={loading && !error}></Spinner>
      {error && !state.teamName && <p className="error">Pick A Team First !</p>}
      {!state.teamID2 && state.teamName && (
        <p className="error">No Info available</p>
      )}

      {!loading && (
        <>
          <div className="squad">
            <div className="squad__player">
              <p>Name:</p>
              <p>Num:</p>
              <p>Pos:</p>
              <p>Age:</p>
              <p>Goals:</p>
              <p>Assists:</p>
            </div>
            {squad.map((player) => (
              <SquadPlayer key={player.id} {...player}></SquadPlayer>
            ))}
          </div>
          <div className="sideline">
            <h1 style={{ color: "#f54d51" }}>Injuries:</h1>
            <div className="sideline__player">
              <p>Name: </p>
              <p>Description: </p>
              <p>Start Date: </p>
              <p>End Date: </p>
            </div>
            {injuries.map((player) => (
              <SquadSideliner key={player.id} {...player}></SquadSideliner>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Squad;
