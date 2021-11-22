import React, { useState } from "react";
import {
  LinearProgress,
  Typography,
  IconButton,
  Card,
  Box,
  Avatar,
  Dialog,
  TextField,
  Button,
  Tooltip,
} from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClassLayout from "../../../components/layout/ClassLayout";
import * as stringUtils from "~/utils/stringUtils";
import { useDispatch, useSelector } from "react-redux";
import { AddCircle } from "@mui/icons-material";
import endpoints from "~/constants/endpoints";
import LoadingButton from "@mui/lab/LoadingButton";
import httpAuthorization from "~/utils/httpAuthorization";
import { GlobalActions } from "../../../store/global";
import { makeStyles } from "@material-ui/styles";
import { imageUrlFormatter } from "~/utils/stringUtils";

const useStyle = makeStyles(() => ({
  iconButton: {
    padding: 4,
  },
}));

const MemberItem = ({ user }) => {
  return (
    <Box className="df aic " p={2}>
      <Avatar
        sx={{
          bgcolor: stringUtils.stringToColor(user.name),
          width: 32,
          height: 32,
          fontSize: 16,
          marginRight: 2,
        }}
        src={user.avatar ? imageUrlFormatter(user.avatar) : "not-exist"}
        alt={user.name}
      />
      <Typography>{user.name}</Typography>
    </Box>
  );
};

const InviteItem = ({ data, onClick }) => {
  const [removing, setRemoving] = useState(false);
  return (
    <Box
      onMouseEnter={() => {
        setRemoving(true);
      }}
      onMouseLeave={() => {
        setRemoving(false);
      }}
      onClick={() => onClick()}
      style={{
        padding: "4px 12px",
        borderRadius: 16,
        border: "1px solid #a1a1a1",
        marginTop: 8,
        marginRight: 8,
        background: removing ? "#F44336" : "none",
        color: removing ? "#fff" : "#000",
        cursor: "pointer",
      }}
    >
      <Typography>{data}</Typography>
    </Box>
  );
};

const InviteMemberDialog = ({ open, handleClose, variant }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { info } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const classes = useStyle();

  const hostname = window.location.hostname;

  const Invite = async () => {
    try {
      setLoading(true);
      await httpAuthorization.post(
        variant === "student" ? endpoints.sendStudent : endpoints.sendTeacher,
        {
          emails: emails,
          courseId: info._id,
        }
      );
      dispatch(GlobalActions.setSnackbarSuccess("Invite Sent!"));
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box className="df fdc" p={2}>
        <Typography className="sb">{`Invite ${variant}s`}</Typography>

        {variant == "student" && (
          <>
            <Typography variant="body2" style={{ marginTop: 8 }}>
              Invite Link
            </Typography>
            <Box className="df jcsb">
              <Typography
                variant="body2"
                color="textSecondary"
                className="one-line-text"
              >{`${hostname}/courses/participate/${info?.code}`}</Typography>
              <Tooltip title="Copy InviteLink">
                <IconButton
                  classes={{ root: classes.iconButton }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${hostname}/courses/participate/${info?.code}`
                    );
                    dispatch(GlobalActions.setSnackbarSuccess("Copied!"));
                  }}
                >
                  <ContentCopyIcon style={{ width: 16, height: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
        <TextField
          variant="outlined"
          value={email}
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (emails.includes(email)) {
                setError("Already in the list");
              } else if (email.includes("@")) {
                setEmails((prev) => [...prev, email]);
                setError("");
                setEmail("");
              } else {
                setError("Please enter valid email");
              }
            }
          }}
          error={!!error}
          helperText={error}
          placeholder="Press enter to confirm email"
          style={{ marginTop: 24, marginBottom: 12 }}
        />
        {!!emails.length && (
          <Typography variant="body2" color="textSecondary">
            Click on email to remove
          </Typography>
        )}
        <Box className="df" mt={1} style={{ width: "100%" }}>
          {emails.map((item) => {
            return (
              <InviteItem
                key={item}
                data={item}
                onClick={() => {
                  setEmails([...emails].filter((data) => data !== item));
                }}
              />
            );
          })}
        </Box>
        <Box mt={5} style={{ borderTop: "1px solid #a1a1a1", paddingTop: 8 }}>
          <Typography variant="body2" color="textSecondary">
            Teachers you add can do everything you can, except delete the class.
          </Typography>
        </Box>

        <Box mt={2} className="df" style={{ justifyContent: "flex-end" }}>
          <Button
            style={{ textTransform: "none" }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <LoadingButton
            style={{ textTransform: "none" }}
            onClick={() => {
              if (!emails.length) {
                setError("Email list is empty");
              } else {
                Invite();
              }
            }}
            loading={loading}
            loadingPosition="center"
          >
            Invite
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const ClassMemberPage = () => {
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const [dialogVariant, setDialogVariant] = useState("");

  const isOwner = info.owner._id === user._id;
  return (
    <ClassLayout maxWidth={"md"} style={{ width: 808 }}>
      <Box
        className="df jcsb"
        px={2}
        pt={2}
        pb={1}
        style={{ borderBottom: "1px solid #1967d2" }}
      >
        <Typography style={{ color: "#1967d2", fontSize: "2rem" }}>
          Teachers
        </Typography>
        <Box className="df aic">
          {isOwner && (
            <IconButton
              onClick={() => {
                setDialogVariant("teacher");
              }}
            >
              <AddCircle style={{ color: "#1967d2" }} />
            </IconButton>
          )}
          <Typography style={{ color: "#1967d2", fontSize: "1rem" }}>
            {[info.owner, ...info.teachers].length} teachers
          </Typography>
        </Box>
      </Box>
      {[info.owner, ...info.teachers].map((user) => {
        return <MemberItem key={user.id} user={user} />;
      })}
      <Box
        className="df jcsb aic"
        px={2}
        pt={2}
        pb={1}
        style={{ borderBottom: "1px solid #1967d2" }}
      >
        <Typography style={{ color: "#1967d2", fontSize: "2rem" }}>
          Classmates
        </Typography>
        <Box className="df aic">
          {isOwner && (
            <IconButton
              onClick={() => {
                setDialogVariant("student");
              }}
            >
              <AddCircle style={{ color: "#1967d2" }} />
            </IconButton>
          )}
          <Typography style={{ color: "#1967d2", fontSize: "1rem" }}>
            {info.participants.length} students
          </Typography>
        </Box>
      </Box>
      {info?.participants?.map((user) => {
        return <MemberItem key={user.id} user={user} />;
      })}
      {dialogVariant && (
        <InviteMemberDialog
          open={!!dialogVariant}
          handleClose={() => {
            setDialogVariant(null);
          }}
          variant={dialogVariant}
        />
      )}
    </ClassLayout>
  );
};

export default ClassMemberPage;
