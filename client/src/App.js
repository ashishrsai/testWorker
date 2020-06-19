import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import setAuthToken from "./helpers/setAuthToken";
import Nav from "./components/Nav";
import LanguageSelection from "./components/LanguageSelection";
import Register from "./components/Register";
import CheckEntity from "./components/CheckEntity";
import CompanyOnBoard from "./components/CompanyOnBoard";
import CompanyOnBoard2 from "./components/CompanyOnBoard2";
import LabourOnBoard from "./components/LabourOnBoard";
import CoordinatorOnBoard from "./components/CoordinatorOnBoard";
import CoordinatorRegister from "./components/CoordinatorRegister";
import Login from "./components/Login";
import EntitySelection from "./components/EntitySelection";
import Dashboard from "./components/Dashboard";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import LabourDashboard from "./components/LabourDashboard";
import PrivateRoute from "./components/PrivateRoute";

import { loadUser } from "./actions/authActions";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={LanguageSelection} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/labour-info" component={LabourOnBoard} />
        <PrivateRoute
          exact
          path="/coordinator-info"
          component={CoordinatorOnBoard}
        />
        <PrivateRoute
          exact
          path="/coordinator-register"
          component={CoordinatorRegister}
        />
        <PrivateRoute exact path="/check-entity" component={CheckEntity} />
        <PrivateRoute exact path="/company-info" component={CompanyOnBoard} />
        <PrivateRoute
          exact
          path="/company-info-2"
          component={CompanyOnBoard2}
        />
        <Route exact path="/entity" component={EntitySelection} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute
          path="/coordinator-dashboard"
          component={CoordinatorDashboard}
        />
        <PrivateRoute path="/labour-dashboard" component={LabourDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
