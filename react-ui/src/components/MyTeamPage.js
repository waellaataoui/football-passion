import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import { Consumer, getID2, getLogo, getSeasonId } from "../context";
import Spinner from "./Spinner";
import StandingsList from "./StandingsList";
const MyTeamPage = (props) => {
  const loading = !props.context.logo && !props.context.teamID;
  const state = {
    teamName: undefined,
    altName: undefined,
    teamID: undefined,
    teamID2: undefined,
    region: undefined,
    leagueID: undefined,
    leagueName: undefined,
    seasonID: undefined,
    logo: undefined
  };
  useEffect(() => {
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${props.match.params.name}`
      )
      .then((res) => res.data.teams[0])
      .then((team) => {
        state.teamName = props.match.params.name;
        state.altName = team.strAlternate;
        state.teamID = team.idTeam;
        state.leagueID = team.idLeague;
        state.region = team.strCountry;
        state.leagueName = team.strLeague;

        getSeasonId(state.leagueID).then((season) => {
          state.seasonID = season;
        });
        getLogo(state.teamID).then((logo) => {
          state.logo = logo;
        });
        getID2(
          state.region,
          state.leagueName,
          state.teamName,
          state.altName
        ).then((id) => {
          state.teamID2 = id;
          props.context.setState(state);
        });
      });
  }, []);
  return (
    <>
      <Spinner loading={loading}></Spinner>
      {!loading && (
        <div className="my_team-container">
          <div className="standings">
            <StandingsList context={props.context}></StandingsList>{" "}
          </div>
          <div className="overview">
            <p>Name: {props.context.teamName}</p>
            {props.context.altName &&
              props.context.altName !== props.context.teamName && (
                <p> {`( ${props.context.altName} )`} </p>
              )}
            <img
              src={props.context.logo}
              className="team-logo_section"
              alt="team-logo"
            ></img>
            <div className="cta">
              <Link className="cta__link" to="/squad">
                <PeopleIcon fontSize="large"> </PeopleIcon> View Squad
              </Link>
              <Link className="cta__link" to="/matches">
                <SportsSoccerIcon fontSize="large"> </SportsSoccerIcon>
                View Matches
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const WrappedMyTeamPage = (props) => (
  <Consumer>
    {(context) => <MyTeamPage {...props} context={context} />}
  </Consumer>
);
export default WrappedMyTeamPage;
