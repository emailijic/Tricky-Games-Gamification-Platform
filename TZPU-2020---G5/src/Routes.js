import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import RegisterUsername from "./components/RegisterUsername";
import RegisterSuccessful from "./components/RegisterSuccessful";
import Test from "./components/Test";
import UpdateProfile from "./components/UpdateProfie";
import DashboardNew from "./components/DashboardNew";
import ListOfQuizzes from "./components/ListOfQuizzes";
import CompletedTests from "./components/CompletedTests";
import WrongAnswers from "./components/WrongAnswers";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/dashboard" component={DashboardNew} />
        <Route exact path="/listOfQuizes" component={ListOfQuizzes} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registerUsername" component={RegisterUsername} />
        <Route
          exact
          path="/registerSuccessful"
          component={RegisterSuccessful}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/updateProfile" component={UpdateProfile} />
        <Route exact path="/completedTests" component={CompletedTests} />
        <Route exact path="/wrongAnswers" component={WrongAnswers} />
      </Switch>
    </Router>
  );
}
