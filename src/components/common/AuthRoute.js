import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const AuthRoute = (props) => {
  const component = () =>
    props.isAuthenticated ? (
      props.children
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { lastPath: props.location.pathname },
        }}
      ></Redirect>
    );
  return (
    <Route exact={props.exact} path={props.path}>
      {component}
    </Route>
  );
};

const mapState = (state) => {
  return {
    isAuthenticated: !!state?.auth?.accessToken,
  };
};

export default connect(mapState)(AuthRoute);
