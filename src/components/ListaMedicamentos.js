import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"

import withUser from "../firebase/withUser"
import Medicamento from '../classes/medicamento';

const base = [
    new Medicamento('a', 2),
    new Medicamento('b', 5)
]

class ListaMedicamentos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meds: base,
            nome: "",
            qtd: 0
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        const {nome, qtd} = this.state
        if(nome.length > 0 && qtd > 0) {
            return this.setState(old => ({
                meds: [...old.meds, new Medicamento(nome, qtd)]
            })
        );
        }
        return;
    }


    // splice retorna o elemento removido, entao n da pra fazer dentro do setstate(eu acho)
    removerMed(index) {
        console.log(index);
        this.state.meds.splice(index,1)
        return this.setState(old => ({
            meds: old.meds
        }))
    }


    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    render() {
        return (
            <div>
                <Card>
                    <h2>Lista de meds registrados:</h2>
                <ul>
                    {
                        this.state.meds.map((obj, index) => {
                            return (<li key={index}>{obj.nome} : {obj.qtd}
                            <Button onClick={
                                () => {
                                console.log("Elemento clicado: " + obj.nome);
                                this.removerMed(index)
                                }
                            }>Remover</Button>
                            </li>)
                        })
                    }
                </ul>
                
                </Card>

                <form>
                        <h2>Registrar meds</h2>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="Nome"
                                    name="Nome"
                                    type="text"
                                    required
                                    margin="normal"
                                    value={this.state.nome}
                                    onChange={this.getFormHandler("nome")}
                                />

                                <TextField
                                    label="Qtd"
                                    name="qtd"
                                    type="text"
                                    required
                                    value={this.state.qtd}
                                    onChange={this.getFormHandler("qtd")}
                                />
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.submitForm} type="submit" color="primary" variant="raised">Add</Button>
                            </CardActions>
                        </Card>
                </form>
            </div>
        );
    }
}

export default ListaMedicamentos;