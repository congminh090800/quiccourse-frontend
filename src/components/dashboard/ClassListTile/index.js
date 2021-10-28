import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import {
  FolderOpen,
  TrendingUp,
  AssignmentIndOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import "./index.scss";
import React, { useState } from "react";
import { loadCover } from "~/constants/defaultCovers";
const ClassListTile = (props) => {
  const [elevation, setElevation] = useState(0);
  function onCardHover() {
    setElevation(8);
  }
  function onCardLeave() {
    setElevation(0);
  }
  return (
    <Card
      onMouseOver={onCardHover}
      onMouseOut={onCardLeave}
      className="class-card-detail"
      sx={{
        width: "300px",
        height: "300px",
        borderRadius: "0.5rem",
        border: "0.0625rem solid #dadce0",
      }}
      elevation={elevation}
    >
      <CardActionArea href="https://google.com">
        <IconButton
          aria-label="more"
          className="more-btn"
          sx={{ color: "#fff" }}
        >
          <MoreVertOutlined />
        </IconButton>
        <CardMedia
          className="class-card-image"
          component="img"
          height="100"
          image={
            props.data.backgroundImg &&
            String(props.data.backgroundImg).length > 2
              ? props.data.backgroundImg
              : loadCover(Number(props.data.backgroundImg))
          }
          alt="class cover"
        ></CardMedia>
        <CardContent className="class-card-content">
          <Typography noWrap variant="h5" component="div">
            {props.data.name}
          </Typography>
          <Typography noWrap gutterBottom variant="body2">
            {props.data.section}
          </Typography>
          <Typography noWrap variant="body2">
            {props.data.owner.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="class-card-actions">
        <IconButton aria-label="trending-up">
          <TrendingUp />
        </IconButton>
        <IconButton aria-label="assignment">
          <AssignmentIndOutlined />
        </IconButton>
        <IconButton aria-label="folder">
          <FolderOpen />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ClassListTile;
