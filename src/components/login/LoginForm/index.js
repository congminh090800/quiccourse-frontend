import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as message from "~/utils/validateRuleMessages";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { connect, useDispatch } from "react-redux";
import { updateAccessToken } from "~/store/auth";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./index.scss";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .min(13, message.min("Email", 13))
    .email("Invalid email address")
    .required(message.required("Email")),
  password: Yup.string()
    .min(6, message.min("Password", 6))
    .max(30, message.max("Password", 30))
    .required(message.required("Password")),
});
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  let history = useHistory();
  let location = useLocation();
  const lastPath = location?.state?.lastPath || "/";
  return (
    <div className="login-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateAccessToken(values))
            .unwrap()
            .then((payload) => {
              if (payload) {
                history.push(lastPath);
              }
            })
            .catch((err) => {
              setError(err);
            });
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="login-form-input">
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="login-form-input">
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="login-form-input">
              <LoadingButton
                loading={props.loading}
                color="primary"
                className="login-btn"
                variant="contained"
                type="submit"
              >
                Login
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
      <div style={{ clear: "both" }}></div>
      <div className="login-hint">
        <div>Hint: use these accounts:</div>
        <div>Admin role: tester1@gmail.com / Design023</div>
        <div>Casual: tester2@gmail.com / Design023</div>
      </div>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  );
};

const mapState = (state) => {
  return {
    accessToken: state.auth.accessToken,
    loading: state.auth.loading,
  };
};

export default connect(mapState)(LoginForm);
