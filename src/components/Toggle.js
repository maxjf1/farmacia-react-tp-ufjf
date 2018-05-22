import React, { Component } from 'react';

function Toggle(props){
    return (
        <div>
            <button onClick={props.onToggle} style={{ background: props.toggled ? "green" : "red" }}>
                {props.label}:
            {props.toggled ? <i>Ligado</i> : <b>Desligado</b>}
            </button>
        </div>
    );
}

export default Toggle;