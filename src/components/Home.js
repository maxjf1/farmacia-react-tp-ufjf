import React, { Component, Button } from 'react';
import { Redirect, Link } from 'react-router-dom'
import withUser from "../firebase/withUser"

const meds = [
    {nome: 'a', qtd: 2},
    {nome: 'b', qtd: 3},
    {nome: 'c', qtd: 1},
    {nome: 'd', qtd: 3}
]

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