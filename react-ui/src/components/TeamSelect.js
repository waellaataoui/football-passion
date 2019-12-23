import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Context } from "../context";
import fetchTeams from "../team_list";
const TeamSelect = (props) => {
  const [teamList, setTeamList] = useState([]);
  const [teamName, setTeamName] = useState("");
  const state = useContext(Context);
  useEffect(() => {
    fetchTeams("spain").then((teams) =>
      setTeamList((prev) => [...prev, ...teams])
    );
    fetchTeams("italy").then((teams) =>
      setTeamList((prev) => [...prev, ...teams])
    );
    fetchTeams("germany").then((teams) =>
      setTeamList((prev) => [...prev, ...teams])
    );
    fetchTeams("england").then((teams) =>
      setTeamList((prev) => [...prev, ...teams])
    );
    fetchTeams("france").then((teams) =>
      setTeamList((prev) => [...prev, ...teams])
    );
  }, []);
  return (
    <div className="team-select">
      <h1>select your team:</h1>
      <Autocomplete
        id="teams"
        options={teamList}
        getOptionLabel={(option) => option}
        style={{ margin: 20 + "px auto" }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            onBlur={(e) => {
              setTeamName(e.target.value);
            }}
            label="Look for your team"
            variant="outlined"
            style={{ maxWidth: 70 + "%" }}
            fullWidth
            color="primary"
          />
        )}
      />
      <Button
        onClick={() => {
          state.setState(undefined);
          if (teamList.includes(teamName)) {
            props.history.push(`/my_team/${teamName}`);
          }
        }}
        variant="outlined"
        size="large"
        color="primary"
      >
        Go
      </Button>
    </div>
  );
};
export default TeamSelect;
