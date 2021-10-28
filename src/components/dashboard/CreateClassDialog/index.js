import React, { useState } from "react";
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
import * as Yup from "yup";
import * as message from "~/utils/validateRuleMessages";
import { connect } from "react-redux";
import { Formik } from "formik";
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";
import { LoadingButton } from "@mui/lab";
import { getRandomCoverIndex } from "~/constants/defaultCovers";

const initialValues = {
  name: "",
  section: "",
  subject: "",
  room: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, message.min("Name", 3))
    .required(message.required("Name")),
  section: Yup.string().min(3, message.min("Section", 3)),
  subject: Yup.string().min(3, message.min("Subject", 3)),
  room: Yup.string().min(3, message.min("Room", 3)),
});

const CreateClassDialog = (props) => {
  const [creating, setCreating] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [error, setError] = useState(null);
  const handleClose = () => {
    props.onClose();
  };
  return (
    <div className="create-class-form">
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>Create class</DialogTitle>
        <DialogContent>
          {error && <DialogContentText>{error.message}</DialogContentText>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                setError(null);
                setCreating(true);
                const backgroundImg = String(getRandomCoverIndex());
                const result = await httpAuthorization.post(
                  endpoints.createCourse,
                  {
                    ...values,
                    owner: props.userId,
                    backgroundImg: backgroundImg,
                  }
                );
                if (result.data) {
                  setCreating(false);
                  props.onClose(true);
                  setShowNoti(true);
                } else {
                  throw new Error("Unexpected error occurred!");
                }
              } catch (err) {
                setError(err);
                setCreating(false);
              }
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  sx={{ mt: 1 }}
                  id="name"
                  label="Class name (required)"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="name"
                />
                <TextField
                  sx={{ mt: 1 }}
                  id="section"
                  label="Section"
                  fullWidth
                  value={formik.values.section}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.section && Boolean(formik.errors.section)
                  }
                  helperText={formik.touched.section && formik.errors.section}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="section"
                />
                <TextField
                  sx={{ mt: 1 }}
                  id="subject"
                  label="Subject"
                  fullWidth
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.subject && Boolean(formik.errors.subject)
                  }
                  helperText={formik.touched.subject && formik.errors.subject}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="subject"
                />
                <TextField
                  sx={{ mt: 1 }}
                  id="room"
                  label="Room"
                  fullWidth
                  value={formik.values.room}
                  onChange={formik.handleChange}
                  error={formik.touched.room && Boolean(formik.errors.room)}
                  helperText={formik.touched.room && formik.errors.room}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="room"
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <LoadingButton
                    loading={creating}
                    disabled={
                      Boolean(formik.errors.name) || !formik.touched.name
                    }
                    type="submit"
                  >
                    Create
                  </LoadingButton>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
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
          Course has been created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapState = (state) => {
  return {
    userId: state.auth.user._id,
  };
};

export default connect(mapState)(CreateClassDialog);
