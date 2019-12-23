import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Matches from "./components/Matches";
import WrappedMyTeamPage from "./components/MyTeamPage";
import Nav from "./components/Nav";
import Squad from "./components/Squad";
import TeamSelect from "./components/TeamSelect";

export const AppRouter = () => {
  return (
    <Router>
      <Nav></Nav>
      <div>
        <Switch>
          <Route path="/" exact component={TeamSelect}></Route>
          <Route
            path="/my_team/:name"
            exact
            component={WrappedMyTeamPage}
          ></Route>
          <Route path="/matches" component={Matches}></Route>
          <Route path="/squad" component={Squad}></Route>
          <Route render={() => <div>404</div>}></Route>
        </Switch>
      </div>
    </Router>
  );
};
