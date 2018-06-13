import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Card, CardContent, CardActions, TextField, InputAdornment, Button } from "@material-ui/core"

import withUser from "../firebase/withUser";
import Medicamento from '../classes/medicamento';
import realtimeDB from '../firebase/db';

const base = [
    new Medicamento(-1, 'a', 2),
    new Medicamento(-1, 'b', 5)
]

class ListaMedicamentos extends Component {

    constructor(props) {
        super(props);
        this.db = new realtimeDB();
        this.dbref = this.db.db;

        this.state = {
            user: this.props.user,
            meds: base,
            nome: "",
            qtd: 0
        }
        
        this.dbref.ref('meds').once('value').then(
            data => {
                var med = [];
                data.forEach(child => {
                    const {id,nome,qtd} = child.val();
                    var m = new Medicamento(id,nome,qtd);
                    med.push(m);
                });
                this.setState({
                    meds: med
                });
                this.registrarDBListener();
            }
        );  
    }


    // coloquei pra recarregar a lista toda qnd alterar algo
    registrarDBListener() {
        this.dbref.ref('meds').on('value', data => {
            var med = [];
            data.forEach(child => {
                const {id,nome,qtd} = child.val();
                var m = new Medicamento(id,nome,qtd);
                med.push(m);
            });
            this.setState({
                meds: med
            });
        });
    }

    submitForm = (event) => {
        event.preventDefault();
        const {nome, qtd} = this.state
        if(nome.length > 0 && qtd > 0) {
            const med = new Medicamento(-1,nome, qtd);
            var v = this.dbref.ref('meds').push(med);
            this.dbref.ref('meds').child(v.key).update({id:v.key}, data => {
                console.log('Sucesso add');
            });
        }
        return;
    }


    removerMed(key) {
        this.dbref.ref('meds').child(key).remove();
    }


    getFormHandler(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    // remover o listener
    componentWillUnmount() {
        this.dbref.ref('meds').off();
    }

    render() {
        return (
            <div>
                <Card>
                    <h2>Lista de meds registrados:</h2>
                <ul>
                    {
                        this.state.meds.map((obj, index) => {
                            return (<li key={index}> {obj.nome} : {obj.qtd}
                            <Button onClick={
                                () => {
                                this.removerMed(obj.id);
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

export default withUser(ListaMedicamentos);