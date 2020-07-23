import React, { Component } from "react";
import styles from "./App.css";
import Navbar from "./components/Navbar";
import firebase, { googleProvider } from "./firebase";
import Routes from "./containers/Routes";
import { navigate } from "@reach/router";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    // this.authListener = this.authListener.bind(this);
  }

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        navigate("/home");
      } else {
        this.setState({ user: null });
        navigate("/");
      }
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <Routes user={this.state.user} />
      </>
    );
  }
}
export default App;
