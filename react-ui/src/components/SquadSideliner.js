import React from "react";

const SquadSideliner = ({ description, name, startdate, enddate }) => {
  return (
    <div className="sideline__player">
      <p>{name}</p>
      <p>{description}</p>
      <p>{startdate}</p>
      <p>{enddate || "Unknown"}</p>
    </div>
  );
};

export default SquadSideliner;
