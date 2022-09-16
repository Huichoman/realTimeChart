// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJE2aZEr_eD7hMmcRvPyD1OhDkmNOg3T0",
  authDomain: "loginfirebaseapp-74538.firebaseapp.com",
  databaseURL: "https://loginfirebaseapp-74538-default-rtdb.firebaseio.com",
  projectId: "loginfirebaseapp-74538",
  storageBucket: "loginfirebaseapp-74538.appspot.com",
  messagingSenderId: "1003743599609",
  appId: "1:1003743599609:web:848d039a976e9db832fb28",
};
// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = app.database();
// const auth = getAuth(app);
// const auth = getAuth();

export { auth, db };
