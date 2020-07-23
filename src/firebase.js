import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBN2wPis8fiSmnpKmJrhWPmV5qR0d32Tk8",
    authDomain: "todolist-bd5c3.firebaseapp.com",
    databaseURL: "https://todolist-bd5c3.firebaseio.com",
    projectId: "todolist-bd5c3",
    storageBucket: "todolist-bd5c3.appspot.com",
    messagingSenderId: "68351438259",
    appId: "1:68351438259:web:13231c97e46f84a47befc6",
    measurementId: "G-TSL712F90D"
});

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const facebookProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;