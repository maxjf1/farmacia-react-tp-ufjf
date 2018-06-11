import {auth} from "./firebase.js"

/*

// registro
export const registrar = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // sucesso
    
  })
  .catch((error) => {
    // falhou
    switch(error.code) {
      case 'auth/email-already-in-use': alert("Email já está em uso"); break;
      case 'auth/invalid-email': alert("Email inválido"); break;
      case 'auth/operation-not-allowed': alert("Operação não suportada"); break;
      case 'auth/weak-password': alert("A senha não é segura o suficiente"); break;
      default: alert("Erro não reconhecido " + error.code);
    }
  });
}

// login
export const login = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
}

// logout
export const logout = () => {
  auth.signOut();
}

export const teste = (texto) => {
    alert(texto);
}

*/