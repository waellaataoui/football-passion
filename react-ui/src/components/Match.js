import React, { useEffect, useState } from "react";
import { getLogo } from "../context";
const Match = ({
  intHomeScore,
  intAwayScore,
  idAwayTeam,
  idHomeTeam,
  dateEvent,
  strAwayTeam,
  strHomeTeam
}) => {
  const [logoH, setLogoH] = useState("");
  const [logoA, setLogoA] = useState("");

  useEffect(() => {
    getLogo(idHomeTeam).then((logo) => {
      setLogoH(logo);
    });
    getLogo(idAwayTeam).then((logo) => {
      setLogoA(logo);
    });
  }, []);
  return (
    <div className="match">
      <p className="date">{dateEvent}</p>
      <div className="teams-box">
        <img className="team-logo_match" src={logoH} alt="logoH" />
        <p>{strHomeTeam}</p>
      </div>

      <div className="middle-box">
        {intHomeScore && <p>{intHomeScore}</p>}

        {intHomeScore ? <p>{"-"}</p> : <p> VS</p>}
        {intAwayScore && <p>{intAwayScore}</p>}
      </div>

      <div className="teams-box">
        <img className="team-logo_match" src={logoA} alt="logoA" />
        <p>{strAwayTeam}</p>
      </div>
    </div>
  );
};

export default Match;
