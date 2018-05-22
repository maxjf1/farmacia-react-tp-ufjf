import React, { Component } from 'react';

import Toggle from "./Toggle"

class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rememberLogin: false,
            notifications: true
        }
    }

    render() {
        return (
            <div>
                <h1>Configuracoes</h1>
                <Toggle
                    label="Lembrar Login?"
                    toggled={this.state.rememberLogin}
                    onToggle={() => this.setState({ rememberLogin: !this.state.rememberLogin })}
                />
                Login: {this.state.rememberLogin ? 1 : 0}
                <Toggle
                    label="Ativat Notificacoes?"
                    toggled={this.state.notifications}
                    onToggle={() => this.setState({ notifications: !this.state.notifications })}
                />
                notifications: {this.state.notifications ? 1 : 0}
            </div>
        );
    }
}

export default SettingsView;