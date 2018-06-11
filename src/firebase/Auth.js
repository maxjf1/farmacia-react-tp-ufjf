import * as firebase from 'firebase';

const configs = {
    apiKey: "AIzaSyDO6VUwlMF0sPHrcJaZkPYaMMKa7-dnlHs",
    authDomain: "test-farmacia-tp.firebaseapp.com",
    databaseURL: "https://test-farmacia-tp.firebaseio.com",
    projectId: "test-farmacia-tp",
    storageBucket: "test-farmacia-tp.appspot.com",
    messagingSenderId: "811313804366"
}

export default class Auth {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(configs)
        }

        this.auth = firebase.auth()
    }

    login(email, pass) {
        return this.auth.signInWithEmailAndPassword(email, pass)
    }

    logout() {
        return this.auth.signOut()
    }

    register({ email, pass }) {
        return this.auth.createUserWithEmailAndPassword(email, pass)
    }

    get isLoggedIn() {
        return Boolean(this.currentUser)
    }

    get currentUser() {
        return this.auth.currentUser
    }
}