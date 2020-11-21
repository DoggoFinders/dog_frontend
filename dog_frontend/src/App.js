import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { Layout } from "antd";
import ImageUpload from "./components/ImageUpload.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./components/landing/Landing";
import LostDogs from "./components/lost/LostDogs";

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/lost">Lost</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/lost">
                <LostDogs />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
