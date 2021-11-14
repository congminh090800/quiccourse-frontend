import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "~/components/common/AuthRoute";
import UploadButtons from "./components/classes/UploadButton";
import SignUp from "~/pages/SignUp";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <AuthRoute exact path={["/", "/classes"]}>
            <Dashboard />
          </AuthRoute>
          <AuthRoute path="/classes/:id">
            <UploadButtons title="Upload Image" />
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
