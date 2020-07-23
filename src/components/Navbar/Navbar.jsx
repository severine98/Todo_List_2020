import React, { Component } from "react";
import styles from "./Navbar.module.scss";
import firebase from "../../firebase";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

class NavBar extends Component {
  redirectToNotes = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        navigate("/notes");
      } else {
        this.setState({ user: null });
        navigate("/");
        alert("Sorry, you need to be signed in to go to this page.");
      }
    });
  };

  redirectToHome = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        navigate("/home");
      } else {
        this.setState({ user: null });
        navigate("/");
        alert("Sorry, you need to be signed in to go to this page.");
      }
    });
  };

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.link}>
          <a href="#" onClick={this.redirectToHome}>
            Home
          </a>
        </div>
        <div className={styles.link}>
          <a href="#" onClick={this.redirectToNotes}>
            To-do list
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
