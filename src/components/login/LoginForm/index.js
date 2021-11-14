import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as message from "~/utils/validateRuleMessages";
import { TextField, Button, Typography } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { connect, useDispatch } from "react-redux";
import { updateAccessToken } from "~/store/auth";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import env from "~/constants/env";
import GoogleLogin from "react-google-login";
import http from "~/utils/http";
import endpoints from "~/constants/endpoints";
import { UPDATE_GOOGLE_ACCOUNT } from "~/store/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
  const [googleLoading, setGoogleLoading] = useState();
  let history = useHistory();
  let location = useLocation();
  const lastPath = location?.state?.lastPath || "/";
  const onGoogleResponse = async (response) => {
    setGoogleLoading(true);
    try {
      const result = await http.post(endpoints.googleSignIn, {
        tokenId: response.tokenId,
      });
      const tokenObj = response.tokenObj;
      dispatch(
        UPDATE_GOOGLE_ACCOUNT({
          expiredAt: tokenObj.expires_at,
          accessToken: response.tokenId,
          user: result.data,
        })
      );
      const lastPath = location?.state?.lastPath || "/";
      setGoogleLoading(false);
      history.push(lastPath);
    } catch (err) {
      console.log(err);
      if (err.message) {
        setError(err);
      } else {
        setError({ message: "Unexpected error!" });
      }
      setGoogleLoading(false);
    }
  };
  const onFailure = (response) => {
    console.log(response);
    setError({ message: response.error });
  };
  return (
    <div className="login-form">
      <div className="login-hint">
        <div>Hint: use these accounts:</div>
        <div>Admin role: tester1@gmail.com / Design023</div>
        <div>Casual: tester2@gmail.com / Design023</div>
      </div>
      <Typography variant="h6" component="div">
        Login
      </Typography>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      {!googleLoading ? (
        <>
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
                    fullWidth
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    fullWidth
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
                  <Button
                    sx={{ marginRight: 2 }}
                    color="primary"
                    className="login-btn"
                    variant="outlined"
                    onClick={() => history.push("/signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            )}
          </Formik>
          <GoogleLogin
            className="google-button"
            clientId={env.googleClientId}
            buttonText="Sign in with Google"
            onSuccess={async (res) => {
              await onGoogleResponse(res);
            }}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            prompt="select_account"
          />
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    accessToken: state?.auth?.accessToken,
    loading: state.auth.loading,
  };
};

export default connect(mapState)(LoginForm);
