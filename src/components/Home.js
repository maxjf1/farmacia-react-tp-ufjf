import React, { Component, Fragment } from 'react';
import { Button } from "@material-ui/core"

import withUser from "../firebase/withUser"
import Header from "./Header"

class Home extends Component {

    render() {
        return (
            <Fragment>
                <Header title="Página inicial" />
                <main className="container">
                    <h2> Bem vindo, {this.props.user.email}! </h2>
                    {this.props.onLogout &&
                        <Button color="primary" variant="raised" fullWidth onClick={this.props.onLogout}>Logout</Button>
                    }
                </main>
            </Fragment>
        );
    }
}

export default withUser(Home);