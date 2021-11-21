import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "~/components/common/AuthRoute";
import UploadButtons from "./components/classes/UploadButton";
import ClassPage from "./pages/Class";
import ClassMemberPage from "./pages/Class/member";
import SignUp from "~/pages/SignUp";
import Profile from "./pages/Profile";

function App() {
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
          <AuthRoute path="/profile">
            <Profile />
          </AuthRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
