import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"
import { AccountCircle, Mail, Lock } from "@material-ui/icons"

import "./Register.css"

//import firebaseApp from "./firebase.js"
import { auth } from './firebase'



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            error: false,
            validations: {}
        }
    }


    validateName(name) {
        if (name.length < 4)
            return "O nome tem que ser maior do que 4 caracteres."
    }

    validateEmail(field) {
        if (!field)
            return "O email e invalido."
    }

    validatePassword(pass) {
        if (pass.length < 6)
            return "A senha tem que ser maior do que 6 caracteres."
    }

    registrar(email, password) {
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(error => {
            // falhou
            switch (error.code) {
                case 'auth/email-already-in-use': alert("Email já está em uso"); break;
                case 'auth/invalid-email': alert("Email inválido"); break;
                case 'auth/operation-not-allowed': alert("Operação não suportada"); break;
                case 'auth/weak-password': alert("A senha não é segura o suficiente"); break;
                default: alert("Erro não reconhecido " + error.code);
            }
        });
        promise.then(() => {
            alert("Sucesso");
            this.context.router.push('/home');
        });
    }

    submitForm = (event) => {
        const { name, email, pass } = this.state
        event.preventDefault();
        const nameValidation = this.validateName(name);
        const emailValidation = this.validateEmail(email);
        const passValidation = this.validatePassword(pass);
        if (nameValidation || emailValidation || passValidation)
            return this.setState({
                error: true, validations: {
                    name: nameValidation, email: emailValidation, pass: passValidation
                }
            })
        else {
            console.warn(email, pass)
            this.props.auth
                .register({ name, email, pass })
                .then(status => console.log(status))
                .catch(err => console.error(err))
        }
    }

    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            this.props.user ?
                <Redirect to="/" /> :
                <form className="register-form">
                    <h1>Formulario de Cadastro</h1>
                    <Card>
                        <CardContent>
                            <TextField
                                label="Usuario"
                                name="user"
                                fullWidth
                                margin="normal"
                                error={this.state.validations.name ? true : false}
                                helperText={this.state.validations.name}
                                value={this.state.name}
                                onChange={this.getFormHandler("name")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />

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
                            <Button onClick={this.submitForm} type="submit" color="primary" variant="raised" fullWidth>Registrar</Button>
                            <Button component={Link} to="/login" color="secondary" variant="raised" fullWidth>Logar</Button>

                        </CardActions>
                    </Card>
                </form>
        );
    }
}

export default Register;