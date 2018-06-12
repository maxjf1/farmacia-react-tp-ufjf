import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom"
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"
import { Mail, Lock } from "@material-ui/icons"

import { auth } from './firebase';
import errorMessages from "../firebase/errorMessages"

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            error: false,
            submiting: false,
        }
    }

    login(email, password) {
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(error => {
            alert(error.message);
        });
        promise.then(() => {
            alert("Sucesso");
            this.props.history.push('/home');
        });
    }

    submitForm = (event) => {
        event.preventDefault();
        const { email, pass } = this.state;
        this.setState({ submiting: true, error: false })
        return this.props.auth
            .login(email, pass)
            .then(status => console.log(status) || this.setState({ submiting: false }))
            .catch(err => console.error(err) || this.setState({ submiting: false, error: err.code }))

    }

    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            this.props.user ?
                <Redirect to="/" /> :
                <div>
                    <form className="register-form" onSubmit={this.submitForm}>
                        <h1>Login</h1>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={this.state.error === "auth/invalid-email" || this.state.error === "auth/user-not-found"}
                                    helperText={this.state.error === "email" && "Email não cadastrado ou inválido."}
                                    value={this.state.email}
                                    onChange={this.getFormHandler("email")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Mail />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    label="Senha"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={this.state.error === "auth/wrong-password"}
                                    helperText={this.state.error === "email" && "Email não cadastrado ou inválido."}
                                    value={this.state.pass}
                                    onChange={this.getFormHandler("pass")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {this.state.submiting && <h2>Aguarde...</h2>}
                                {this.state.error && <h2>{errorMessages[this.state.error] || errorMessages.default}</h2>}
                            </CardContent>
                            <CardActions>
                                <Button disabled={this.state.submiting} onClick={this.submitForm} type="submit" color="primary" variant="raised" fullWidth>Login</Button>
                                <Button disabled={this.state.submiting} component={Link} to="/register" color="secondary" variant="raised" fullWidth>Registrar</Button>
                            </CardActions>

                        </Card>
                    </form>
                </div>
        );
    }
}

export default Login;