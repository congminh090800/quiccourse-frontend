import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import { Menu } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarPopup from "../../common/NavBar/AvatarPopup";
import "./index.scss";

const ClassNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.classes);

  return (
    <Box>
      <AppBar sx={{ height: "64px" }} className="hide-app-bar">
        <Toolbar className="df jcsb pr">
          <Box className="df aic ">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography
              className="df fdc"
              style={{
                // font-size: 1.3rem;
                // line-height: 1.7em;
                fontSize: "1.3rem",
              }}
            >
              Advanced Web
            </Typography>
          </Box>
          <Box
            className="pa df"
            style={{
              left: "50%",
              transform: "translateX(-60%)",
            }}
          >
            <Box>
              <Button
                className="nav-button"
                component={Link}
                to={`/classes/${info?.code}`}
              >
                Stream
              </Button>
            </Box>
            <Box>
              <Button className="nav-button">Classword</Button>
            </Box>
            <Box>
              <Button
                className="nav-button"
                component={Link}
                to={`/classes/${info?.code}/member`}
              >
                People
              </Button>
            </Box>
          </Box>
          <AvatarPopup user={user} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ClassNavbar;
