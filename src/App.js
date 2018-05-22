import React, { Component } from 'react';
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import red from '@material-ui/core/colors/red';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import Register from "./components/Register"



const temaPadrao = createMuiTheme({
  palette: {
    primary: red,
  },
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={temaPadrao}>
          <Switch>
            <Route path="/" exact={true} component={() => <Link to="/register">Register</Link>}/>
            <Route path="/register" component={Register} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
