import React from "react";
import ClassListTile from "../ClassListTile";
import { Grid } from "@material-ui/core";
import { getRandomCover } from "~/constants/defaultCovers";
const ClassList = (props) => {
  const renderTiles = () => {
    return props.classes.map((ele) => (
      <Grid key={ele._id} item>
        <ClassListTile data={ele} cover={getRandomCover()} />
      </Grid>
    ));
  };
  return (
    <React.Fragment>
      <Grid container spacing={3} columns={{ lg: 4, md: 6, sm: 12 }}>
        {renderTiles()}
      </Grid>
    </React.Fragment>
  );
};

export default ClassList;
