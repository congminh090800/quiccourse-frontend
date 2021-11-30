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
import { useHistory, useLocation } from "react-router";
import Logo from "~/assets/images/google_logo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarPopup from "../../common/NavBar/AvatarPopup";
import "./index.scss";

const ClassNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.classes);
  const history = useHistory();
  const location = useLocation();

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
              onClick={() => history.push("/")}
              className="app-bar-title"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              <Logo className="app-bar-logo" alt="Google" />
              <span>&nbsp;Classroom</span>
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
                className={`nav-button ${
                  location.pathname.split("/").pop() == info?.code
                    ? "active"
                    : ""
                }`}
                component={Link}
                to={`/classes/${info?.code}`}
              >
                Stream
              </Button>
            </Box>
            <Box>
              <Button
                className={`nav-button ${
                  location.pathname.split("/").pop() == "classwork"
                    ? "active"
                    : ""
                }`}
                component={Link}
                to={`/classes/${info?.code}/classwork`}
              >
                Classwork
              </Button>
            </Box>
            <Box>
              <Button
                className={`nav-button ${
                  location.pathname.split("/").pop() == "member" ? "active" : ""
                }`}
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
