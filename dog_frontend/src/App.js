import React from "react";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import { BrowserRouter as Router } from "react-router-dom";
import AppWrapper from "./AppWrapper";

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
