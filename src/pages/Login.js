import LoginForm from "~/components/login/LoginForm";
import { connect } from "react-redux";

const Login = (props) => {
  console.log(props.expired);
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
      state.auth.accessToken &&
      new Date() > new Date(state.auth.expiredAt) - 10000, // 10 second of delay in safe
  };
};

export default connect(mapState)(Login);
