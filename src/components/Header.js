import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core"

class Header extends Component {
    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            {this.props.title || "Farmácia"}
                        </Typography>
                    </Toolbar>
                    {this.props.children}
                </AppBar>
            </header>
        );
    }
}

export default Header;