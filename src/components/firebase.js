//import { Component } from 'react';
import * as firebase from 'firebase';

/*
const config = {
  apiKey: "AIzaSyDO6VUwlMF0sPHrcJaZkPYaMMKa7-dnlHs",
  authDomain: "test-farmacia-tp.firebaseapp.com",
  databaseURL: "https://test-farmacia-tp.firebaseio.com",
  projectId: "test-farmacia-tp",
  storageBucket: "test-farmacia-tp.appspot.com",
  messagingSenderId: "811313804366"
};


class firebaseApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firebaseUser: null
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(user => {
      this.setState({
        firebaseUser: user
      });
      console.log(this.state.firebaseUser);
    });
  }

  registrar(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  sair() {
    return this.auth.signOut();
  }

  getUser() {
    return this.state.firebaseUser;
  }

  getAuth() {
    return this.auth;
  }


}

export default firebaseApp;

*/


const config = {
    apiKey: "AIzaSyDO6VUwlMF0sPHrcJaZkPYaMMKa7-dnlHs",
    authDomain: "test-farmacia-tp.firebaseapp.com",
    databaseURL: "https://test-farmacia-tp.firebaseio.com",
    projectId: "test-farmacia-tp",
    storageBucket: "test-farmacia-tp.appspot.com",
    messagingSenderId: "811313804366"
  };

var firebaseUser = null;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
auth.signOut();


auth.onAuthStateChanged(user => {
  firebaseUser = user;
  if(user) {
    console.log("firebase.js: " + user.email);
  } else {
    console.log("firebase.js: user null");
  }
});


//export default firebaseUser

export {
  auth,
  firebaseUser
};
