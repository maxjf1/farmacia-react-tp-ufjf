import React, { Component } from 'react';
import withUser from "../firebase/withUser"


class Home extends Component {

    render() {
        return (
            <div>
                <h2> Bem vindo, {this.props.user.email}! </h2>
                {this.props.onLogout && <button onClick={this.props.onLogout}>Logout</button>}

            </div>
        );
    }
}



export default withUser(Home);