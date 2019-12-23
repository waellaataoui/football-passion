import axios from "axios";
import React, { useState } from "react";
export const Context = React.createContext();
export const Provider = (props) => {
  const [state, setState] = useState({
    teamName: undefined,
    altName: undefined,
    teamID: undefined,
    teamID2: undefined,
    region: undefined,
    leagueID: undefined,
    leagueName: undefined,
    seasonID: undefined,
    logo: undefined
  });

  // useEffect(() => {}, []);

  return (
    <Context.Provider value={{ ...state, setState }}>
      {props.children}
    </Context.Provider>
  );
};
export const Consumer = Context.Consumer;

export const getSeasonId = (leagueId) => {
  return axios
    .get(
      `https://www.thesportsdb.com/api/v1/json/1/search_all_seasons.php?id=${leagueId}
`
    )
    .then((res) => res.data.seasons)
    .then((seasons) => {
      if (seasons !== null) return seasons[seasons.length - 1].strSeason;
      else return undefined;
    });
};

export const getLogo = (teamId) => {
  return axios
    .get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}
`
    )
    .then((res) => res.data.teams[0])
    .then((team) => {
      return team.strTeamBadge + "/preview";
    });
};
export const getID2 = (region, leagueName, teamName, altName) => {
  return axios
    .get(
      ` https://data.football-api.com/v3/competitions?Authorization=cfnR6LWc4i4MDFLlPJrajoa465c4qjF594kpIy4b
  `
    )
    .then((res) => res.data)
    .then((competetions) => {
      const league = competetions.filter(
        (competetion) =>
          competetion.region === region && leagueName.includes(competetion.name)
      );
      if (league.length === 0) return null;
      else
        return axios
          .get(
            `https://data.football-api.com/v3/standings/${league[0].id}?Authorization=cfnR6LWc4i4MDFLlPJrajoa465c4qjF594kpIy4b
`
          )
          .then((res) => res.data)
          .then((teams) => {
            const team = teams.filter(
              (elem) =>
                elem.team_name === teamName ||
                teamName.includes(elem.team_name) ||
                (altName &&
                  !!elem.team_name &&
                  test(altName, elem.team_name)) ||
                (altName &&
                  !!elem.team_name &&
                  test(elem.team_name, altName)) ||
                (!!elem.team_name && elem.team_name.includes(teamName))
            );
            if (team[0]) return team[0].team_id;
            else return undefined;
          });
    });
};
function test(string, substring) {
  var letters = [...string];
  return [...substring].every((x) => {
    var index = letters.indexOf(x);
    if (~index) {
      letters.splice(index, 1);
      return true;
    } else return false;
  });
}
