import React from "react";
import Button from "@material-ui/core/Button";
const BackButton = ({ history }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        marginTop: 10 + "px",
        marginRight: "auto",
        marginLeft: 10 + "%",
        width: "15%"
      }}
      onClick={history.goBack}
    >
      Back
    </Button>
  );
};

export default BackButton;
