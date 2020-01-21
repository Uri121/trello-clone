import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { store } from "../store/reducers/combainReducer";
import { history } from "../store/history";
import Login from "./Login";
import Signup from "./Signup";
import { loadUser } from "../store/actions/authActions";
import { Redirect } from "react-router";
import Dashboard from "./Dashboard";
const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.dispatch(loadUser());
    }
  }, []);

  const RouteGuard = Component => ({ match }) =>
    !store.getState().auth.isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Component match={match} />
    );

  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" render={RouteGuard(Dashboard)} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
