import * as firebase from 'firebase';

const configs = {
    apiKey: "AIzaSyDO6VUwlMF0sPHrcJaZkPYaMMKa7-dnlHs",
    authDomain: "test-farmacia-tp.firebaseapp.com",
    databaseURL: "https://test-farmacia-tp.firebaseio.com",
    projectId: "test-farmacia-tp",
    storageBucket: "test-farmacia-tp.appspot.com",
    messagingSenderId: "811313804366"
}

export default class realtimeDB {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(configs)
        }

        this.db = firebase.database();
        /*
        // listener para alteraçoes em uma tabela/dado
        this.db.ref('meds').on('value', data => {
            console.log(data.val());
        });

        // obtem os dados 1 vez só
        this.db.ref('meds').child('med1').once('value').then(
            function(data) {
                // data.val() extrai os dados do snapshot
                console.log(data.val());
            }
        );
        
        
        this.db.ref('meds').push({
            nome: 'testeadd',
            qtd: 5
        });
        */
    }

    addDado(params) {
            this.db.ref('meds').push({
                // push cria um id unico pra entrada no db
                nome: params.nome,
                qtd: params.qtd
            });
    }
}