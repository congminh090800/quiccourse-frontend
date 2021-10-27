import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const re = /^([a-zA-Z0-9]){5,7}$/;
const JoinClassDialog = (props) => {
  const [error, setError] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const handleClose = () => {
    props.onClose();
  };
  function onChange(event) {
    setTouched(true);
    if (re.test(event.target.value)) {
      setError(null);
    } else {
      setError("Invalid code format");
    }
  }
  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>Class code</DialogTitle>
        <DialogContent>
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
            error={touched && error}
            helperText={touched && error}
          />
          <DialogContentText sx={{ fontSize: 12 }}>
            Use a class code with 5-7 letters or numbers, and no spaces or
            symbols
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JoinClassDialog;
