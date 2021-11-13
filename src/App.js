import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "~/components/common/AuthRoute";
import UploadButtons from "./components/classes/UploadButton";
import ClassPage from "./pages/Class";
import ClassMemberPage from "./pages/Class/member";
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
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
