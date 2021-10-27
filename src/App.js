import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "~/components/common/AuthRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <AuthRoute exact path="/">
            <Dashboard />
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
