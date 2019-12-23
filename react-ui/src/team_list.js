import axios from "axios";

const fetchTeams = (country) => {
  return axios
    .get(
      `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=${country}`
    )
    .then((res) => res.data)
    .then(async ({ teams }) => {
      const list = await teams.map((team) => team.strTeam);
      return list;
    });
};
export default fetchTeams;
