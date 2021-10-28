import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";

const re = /^([a-zA-Z0-9]){5,7}$/;
const JoinClassDialog = (props) => {
  const [error, setError] = React.useState(null);
  const [reqError, setReqError] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [codeRoom, setCodeRoom] = React.useState("");
  const [showNoti, setShowNoti] = React.useState(false);
  const handleClose = () => {
    props.onClose();
  };
  function onChange(event) {
    setCodeRoom(event.target.value);
    setTouched(true);
    if (re.test(event.target.value)) {
      setError(null);
    } else {
      setError("Invalid code format");
    }
  }

  async function handleJoin() {
    setLoading(false);
    try {
      const course = await httpAuthorization.patch(
        endpoints.participateCourse(codeRoom)
      );
      if (course) {
        setLoading(false);
        props.onClose(true);
        setShowNoti(true);
      } else {
        throw new Error("Unexpected error occurred!");
      }
    } catch (err) {
      setReqError(err);
      setLoading(false);
    }
  }
  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>Class code</DialogTitle>
        <DialogContent>
          {reqError && (
            <DialogContentText sx={{ color: "red" }}>
              {reqError.message}
            </DialogContentText>
          )}
          <DialogContentText>
            Ask your teacher for the class code, then enter it here.
          </DialogContentText>
          <TextField
            sx={{ mt: 1 }}
            id="name"
            label="Class code"
            fullWidth
            variant="outlined"
            onChange={onChange}
            error={touched && Boolean(error)}
            helperText={touched && error}
          />
          <DialogContentText sx={{ fontSize: 12 }}>
            Use a class code with 5-7 letters or numbers, and no spaces or
            symbols
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            onClick={handleJoin}
            disabled={!touched || Boolean(error)}
          >
            Join
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showNoti}
        autoHideDuration={3000}
        onClose={() => setShowNoti(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setShowNoti(false)}
          severity="success"
          sx={{ width: "100%" }}
          elevation={4}
          variant="filled"
        >
          Congrats! You joined successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default JoinClassDialog;
