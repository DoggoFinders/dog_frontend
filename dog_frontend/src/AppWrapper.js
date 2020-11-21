import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import Landing from "./components/landing/Landing";
import LostDogs from "./components/lost/LostDogs";
import BottomNav from "./components/BottomNav";

const AppWrapper = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/lost">
          <LostDogs />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <BottomNav />
    </div>
  );
};

AppWrapper.propTypes = {};

export default withRouter(AppWrapper);
