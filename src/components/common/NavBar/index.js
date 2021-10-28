import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Slide,
  Toolbar,
  useScrollTrigger,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@material-ui/core";
import { Menu, Add } from "@mui/icons-material";
import { connect } from "react-redux";
import Logo from "~/assets/images/google_logo.svg";
import "./index.scss";
import AvatarPopup from "./AvatarPopup";
const HideOnScroll = (props) => {
  const trigger = useScrollTrigger();
  const elevateTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const elevateChildren = React.cloneElement(props.children, {
    elevation: elevateTrigger ? 4 : 0,
    sx: {
      ...props.children.sx,
    },
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {elevateChildren}
    </Slide>
  );
};

const AutoHideNavBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar sx={{ height: "64px" }} className="hide-app-bar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography
              className="app-bar-title"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Logo className="app-bar-logo" alt="Google" />
              <span>&nbsp;Classroom</span>
            </Typography>
            <IconButton
              sx={{ mr: 1 }}
              size="large"
              color="inherit"
              onClick={handleClick}
            >
              <Add />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClick={handleClose}
            >
              <List dense sx={{ borderRadius: "4px" }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => props.openJoinDialog()}>
                    <ListItemText primary="Join class" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => props.openCreateDialog()}>
                    <ListItemText primary="Create class" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
            <AvatarPopup user={props.user} />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapState)(AutoHideNavBar);
