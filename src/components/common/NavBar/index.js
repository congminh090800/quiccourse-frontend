import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Slide,
  Toolbar,
  useScrollTrigger,
  IconButton,
  Avatar,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@material-ui/core";
import { Menu, Add } from "@mui/icons-material";
import * as stringUtils from "~/utils/stringUtils";
import { connect } from "react-redux";
import "./index.scss";
const HideOnScroll = (props) => {
  const trigger = useScrollTrigger();
  const elevateTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const elevateChildren = React.cloneElement(props.children, {
    elevation: elevateTrigger ? 4 : 0,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {elevateChildren}
    </Slide>
  );
};

const AutoHideNavBar = (props) => {
  const user = props.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className="hide-app-bar">
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
              <img
                className="app-bar-logo"
                src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
                alt="Google"
              />
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
              id={id}
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
                  <ListItemButton onClick={() => alert("Clicking create")}>
                    <ListItemText primary="Create class" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
            <Tooltip
              disableFocusListener
              disableTouchListener
              placement="bottom-end"
              title={
                <span
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "14px",
                    lineHeight: "22px",
                  }}
                >{`${user.name}\n${user.email}`}</span>
              }
            >
              <IconButton>
                <Avatar
                  sx={{
                    bgcolor: stringUtils.stringToColor("Minh Le"),
                    width: 32,
                    height: 32,
                    fontSize: 16,
                  }}
                  src={user.avatar ? user.avatar : "not-exist"}
                  alt={user.name}
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapState)(AutoHideNavBar);
