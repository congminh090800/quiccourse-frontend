import {
  Popover,
  Tooltip,
  Avatar,
  IconButton,
  Container,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { CameraAltOutlined } from "@mui/icons-material";
import { Box } from "@material-ui/system";
import { useState } from "react";
import * as stringUtils from "~/utils/stringUtils";
import "./index.scss";
import { useDispatch } from "react-redux";
import { DELETE_ACCESS_TOKEN } from "~/store/auth";
import { useHistory } from "react-router-dom";

const SmallBadge = styled(CameraAltOutlined)(({ theme }) => ({
  width: 20,
  height: 20,
  padding: 4,
  margin: "4px 4px 10px 4px",
  borderRadius: "50%",
  background: theme.palette.background.paper,
  boxShadow:
    "0 1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%)",
}));

const AvatarPopup = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(DELETE_ACCESS_TOKEN());
    history.push("/login");
  };
  const open = Boolean(anchorEl);
  const user = props.user;
  return (
    <>
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
        <IconButton onClick={handleClick}>
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
        <Box>
          <Container
            sx={{ width: "350px", margin: "20px 33px", textAlign: "center" }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SmallBadge />}
            >
              <Avatar
                sx={{
                  bgcolor: stringUtils.stringToColor("Minh Le"),
                  width: 80,
                  height: 80,
                  fontSize: 40,
                }}
                src={user.avatar ? user.avatar : "not-exist"}
                alt={user.name}
              ></Avatar>
            </Badge>
            <Typography
              sx={{
                mt: 1,
                color: "#202124",
                fontWeight: "500px",
                fontSize: "16px",
                lineHeight: "22px",
              }}
              component="div"
            >
              {user.name}
            </Typography>
            <Typography
              sx={{
                color: "#5f6368",
                fontWeight: "400px",
                fontSize: "14px",
                lineHeight: "19px",
              }}
              component="div"
            >
              {user.email}
            </Typography>
            <div>
              <Button
                variant="outlined"
                disableElevation
                className="manage-btn"
              >
                Manage your account
              </Button>
            </div>

            <div>
              <Button
                variant="outlined"
                disableElevation
                className="sign-out-btn"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </Container>
        </Box>
      </Popover>
    </>
  );
};

export default AvatarPopup;
