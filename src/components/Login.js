import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom"
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"
import { Mail, Lock } from "@material-ui/icons"

import { auth } from './firebase';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            error: false,
            validations: {}
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

    validateEmail(field) {
        if (!field)
            return "O email e invalido."
    }

    validatePassword(pass) {
        if (pass.length < 6)
            return "A senha tem que ser maior do que 6 caracteres."
    }

    submitForm = (event) => {
        event.preventDefault();
        const { email, pass } = this.state;
        const emailValidation = this.validateEmail(email);
        const passValidation = this.validatePassword(pass);
        if (emailValidation || passValidation)
            return this.setState({
                error: true, validations: {
                    email: emailValidation, pass: passValidation
                }
            })
        else {
            return this.props.auth
                .login(email, pass)
                .then(status => console.log(status))
                .catch(err => console.log(err))
        }
    }

    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            this.props.user ?
                <Redirect to="/"/> :
                <div>
                    <form className="register-form">
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
                                    error={this.state.validations.email ? true : false}
                                    helperText={this.state.validations.email}
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
                                    error={this.state.validations.pass ? true : false}
                                    helperText={this.state.validations.pass}
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


                            </CardContent>
                            <CardActions>
                                <Button onClick={this.submitForm} type="submit" color="primary" variant="raised" fullWidth>Login</Button>
                                <Button component={Link} to="/register" color="secondary" variant="raised" fullWidth>Registrar</Button>
                            </CardActions>

                        </Card>
                    </form>
                </div>
        );
    }
}

export default Login;