import React from "react";
import ClassListTile from "../ClassListTile";
import { Grid } from "@material-ui/core";
const ClassList = (props) => {
  const renderTiles = () => {
    return props.classes.map((ele) => (
      <Grid key={ele._id} item>
        <ClassListTile data={ele} />
      </Grid>
    ));
  };
  return (
    <React.Fragment>
      <Grid container spacing={3} columns={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
        {renderTiles()}
      </Grid>
    </React.Fragment>
  );
};

export default ClassList;
