import React from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../context";
import logo from "../images/logo2.png";

const Nav = () => {
  return (
    <Consumer>
      {(value) => {
        return (
          <nav className="header">
            <img className="team-logo" src={value.logo} alt=""></img>
            <Link to="/">
              <img className="logo" src={logo} alt="logo"></img>
            </Link>
          </nav>
        );
      }}
    </Consumer>
  );
};
export default Nav;
