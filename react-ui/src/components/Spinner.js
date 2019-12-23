import React from "react";
import { BounceLoader } from "react-spinners";

const Spinner = (props) => {
  return (
    <BounceLoader
      css="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"
      color="#7e7afa"
      loading={props.loading}
    />
  );
};

export default Spinner;
