import React, { Component } from "react";
import firebase, { googleProvider, facebookProvider } from "../../firebase";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { redirectTo } from "@reach/router";

class Login extends Component {
  signUp() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log("Successfully Signed Up");
      })
      .catch((err) => {
        alert("Error: " + err.toString());
      });
  }

  login() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        console.log("Successfully Logged In");
      })
      .catch((err) => {
        alert("Error: " + err.toString());
      });
  }

  signInGoogle = () => {
    firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .then(() => console.log("redirecting"));
    console.log("logged in with google");
  };

  signInFacebook = () => {
    firebase
      .auth()
      .signInWithRedirect(facebookProvider)
      .then(() => redirectTo("/home"));
  };

  render() {
    return (
      <section className={styles.login}>
        <h1 className={styles.loginTitle}>
          {" "}
          Hey there! <br /> Please log in or sign up to access your to-do list!{" "}
        </h1>
        <div className={styles.form}>
          <div>
            <div>Email</div>
            <input id="email" placeholder="Enter Email.." type="text" />
          </div>
          <div>
            <div>Password</div>
            <input id="password" placeholder="Enter Password.." type="text" />
          </div>
          <div>
            <button style={{ margin: "10px" }} onClick={this.login}>
              Login
            </button>
            <button style={{ margin: "10px" }} onClick={this.signUp}>
              Sign Up
            </button>
          </div>
          <button
            onClick={this.signInGoogle}
            className={styles.alternativeSignIn}
            style={{ backgroundColor: "red" }}
          >
            Google
            <FontAwesomeIcon icon={faCoffee} className={styles.icon} />
          </button>
          <button
            onClick={this.signInFacebook}
            className={styles.alternativeSignIn}
          >
            Facebook
            <FontAwesomeIcon icon={faCoffee} className={styles.icon} />
          </button>
        </div>
      </section>
    );
  }
}

export default Login;
