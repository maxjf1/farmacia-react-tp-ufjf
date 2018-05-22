import React, { Component } from 'react';
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"
import { AccountCircle, Mail, Lock } from "@material-ui/icons"

import "./Register.css"

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
        if (pass.length < 4)
            return "A senha tem que ser maior do que 4 caracteres."
    }

    submitForm = (event) => {
        event.preventDefault();
        const nameValidation = this.validateName(this.state.name);
        const emailValidation = this.validateEmail(this.state.email);
        const passValidation = this.validatePassword(this.state.pass);
        if (nameValidation || emailValidation || passValidation)
            return this.setState({
                error: true, validations: {
                    name: nameValidation, email: emailValidation, pass: passValidation
                }
            })
        alert("Sucesso.")
    }

    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }
    render() {
        return (
            <form action="foo.php" className="register-form">
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
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default Register;