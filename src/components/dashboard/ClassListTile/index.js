import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardActionArea,
  Avatar,
} from "@material-ui/core";
import {
  FolderOpen,
  TrendingUp,
  AssignmentIndOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { connect } from "react-redux";
import * as stringUtils from "~/utils/stringUtils";
import { Link } from "react-router-dom";
import "./index.scss";
import React, { useState } from "react";
import { loadCover } from "~/constants/defaultCovers";
import env from "~/constants/env";
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
      <CardActionArea component={Link} to={`/classes/${props.data._id}`}>
        <IconButton
          aria-label="more"
          className="more-btn"
          sx={{ color: "#fff" }}
        >
          <MoreVertOutlined />
        </IconButton>
        {props.userId !== props.data.owner._id && (
          <Avatar
            className="avatar-in-tile"
            sx={{
              bgcolor: stringUtils.stringToColor(props.data.owner.name),
              width: 75,
              height: 75,
              fontSize: 37,
            }}
            src={props.data.owner.avatar}
            alt={props.data.owner.name}
          ></Avatar>
        )}
        <CardMedia
          className="class-card-image"
          component="img"
          height="100"
          image={
            props.data.backgroundImg &&
            String(props.data.backgroundImg).length > 2
              ? `${env.apiUrl}${props.data.backgroundImg}`
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
          <Typography
            sx={{ color: "#000000", overflow: "visible", fontSize: 12, mt: 2 }}
            component="div"
          >
            Class code: {props.data.code} | TODO: testing, will be removed later
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
const mapState = (state) => {
  return {
    userId: state.auth.user._id,
  };
};
export default connect(mapState)(ClassListTile);
