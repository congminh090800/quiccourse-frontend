import LoginForm from "~/components/login/LoginForm";
import { connect } from "react-redux";
const Login = (props) => {
  return (
    <div>
      {props.expired && (
        <div style={{ color: "red" }}>session expired, login again!</div>
      )}
      <LoginForm />
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
