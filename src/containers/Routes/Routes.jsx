import React, { Component } from "react";
import { Router } from "@reach/router";
import Login from "../Login";
import Home from "../Home";
import Notes from "../../containers/Notes";
import PrivateRoutes from "../PrivateRoutes";

class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Login path="/" />
        <PrivateRoutes path="/">
          <Home path="home" user={this.props.user}/>
          <Notes path="notes" user={this.props.user}/>
        </PrivateRoutes>
      </Router>
    );
  }
}

export default Routes;
