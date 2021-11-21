import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "~/components/common/AuthRoute";
import UploadButtons from "./components/classes/UploadButton";
import ClassPage from "./pages/Class";
import ClassMemberPage from "./pages/Class/member";
import SignUp from "~/pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GlobalActions } from "./store/global";
import ParticipatingCoursePage from "./pages/courses/participate";

function App() {
  const { snackbarSuccess } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="App">
        <Switch>
          <AuthRoute exact path={["/", "/classes"]}>
            <Dashboard />
          </AuthRoute>
          <AuthRoute path="/classes/:code" exact>
            <ClassPage />
          </AuthRoute>
          <AuthRoute path="/classes/:code/member">
            <ClassMemberPage />
          </AuthRoute>
          <AuthRoute path="/courses/participate/:code">
            <ParticipatingCoursePage />
          </AuthRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
        <Snackbar
          open={!!snackbarSuccess}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            dispatch(GlobalActions.setSnackbarSuccess(null));
            // setOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              dispatch(GlobalActions.setSnackbarSuccess(null));
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarSuccess}
          </Alert>
        </Snackbar>
      </div>
    </Router>
  );
}

export default App;
