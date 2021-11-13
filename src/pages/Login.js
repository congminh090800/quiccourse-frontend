import LoginForm from "~/components/login/LoginForm";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import http from "~/utils/http";
import endpoints from "~/constants/endpoints";
import { useDispatch } from "react-redux";
import { UPDATE_GOOGLE_ACCOUNT } from "~/store/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import env from "~/constants/env";
const Login = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFailure = (response) => {
    setError("Google login failed");
  };
  let history = useHistory();
  let location = useLocation();
  const onGoogleResponse = async (response) => {
    setLoading(true);
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
      history.push(lastPath);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {!loading ? (
        <>
          {" "}
          {props.expired && (
            <div style={{ color: "red" }}>session expired, login again!</div>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <LoginForm />
          <GoogleLogin
            clientId={env.googleClientId}
            buttonText="Login"
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
    expired:
      state.auth.accessToken && new Date() > new Date(state.auth.expiredAt),
  };
};

export default connect(mapState)(Login);
