import React, { Component } from "react";
import firebase from "../../firebase";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.scss";
import avatar from "./avatar.png";

class Home extends Component {
  logout() {
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    const username = user ? user.displayName : "No user";
    const image = user ? user.photoURL : avatar;
    const email = user ? user.email : "No user";

    const isTherePic = (img) => {
      if (img === null) {
        return avatar;
      } else {
        return img;
      }
    };

    return (
      <section className={styles.home}>
        <div style={{ textAlign: "center" }} className={styles.main}>
          <h1>
            Welcome back <span className={styles.name}>{username}</span>!
          </h1>{" "}
          <br />
          <div className={styles.imgContainer}>
            <img src={isTherePic(image)} alt="pic" />
          </div>{" "}
          <br /> <br />
          <p>
            Thank you for logging in with{" "}
            <span className={styles.email}>{email}</span>
          </p>
          <br />
          <br />
          <Button onClick={this.logout} variant="outline-danger">
            Logout
          </Button>{" "}
        </div>
      </section>
    );
  }
}

export default Home;
