import React, { Component } from 'react';
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { indigo, blueGrey } from '@material-ui/core/colors';
import { BrowserRouter, Switch, Route } from "react-router-dom"

//import firebaseApp from './components/firebase';
import Register from "./components/Register"
import Home from "./components/Home"
import Login from "./components/Login"

import Auth from "./firebase/Auth"

const temaPadrao = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blueGrey
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.auth = new Auth();
        this.state = {
            user: this.auth.currentUser
        }
    }


    componentDidMount() {
        this.auth.auth.onAuthStateChanged(user => this.setState({ user: user }))
    }

    render() {

        return (
            <BrowserRouter>
                <MuiThemeProvider theme={temaPadrao}>
                    <Switch>

                        <Route path="/" exact render={() => <Home user={this.state.user} onLogout={() => this.auth.logout()} />} />
                        <Route path="/register" render={() => <Register auth={this.auth} user={this.state.user} />} />
                        <Route path="/login" render={() => <Login auth={this.auth} user={this.state.user} />} />


                    </Switch>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}



export default App;