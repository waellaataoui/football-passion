import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import BackButton from "./BackButton";
import Match from "./Match";
import Spinner from "./Spinner";
const Matches = (props) => {
  console.log(props);
  const state = useContext(Context);
  const [games, setGames] = useState(null);
  const loading = games === null;
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${state.teamID}
    `
      )
      .then((res) => res.data.results)
      .then((results) => {
        if (results && typeof results !== "string") setGames(results.reverse());
        else setError(true);
      })
      .then((res) => {
        axios
          .get(
            `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${state.teamID}
  
      `
          )
          .then((res) => res.data.events)
          .then((events) => {
            if (events && typeof events !== "string")
              setGames((prev) => {
                console.log(prev, events);
                return [...prev, ...events];
              });
          });
      });
  }, []);
  return (
    <div className="matches">
      <BackButton history={props.history}></BackButton>
      <h1>Matches:</h1>
      <Spinner loading={loading && !error}> </Spinner>
      {!loading &&
        games.map((game) => <Match key={game.idEvent} {...game}></Match>)}
      {error && state.teamID && <p className="error"> No Info Available</p>}
      {!state.teamID && <p className="error"> Select a team first</p>}
    </div>
  );
};
export default Matches;
