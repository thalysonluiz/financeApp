import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { child, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

import { firebase } from '../services/firebase/connection'

const auth = getAuth(firebase);
const database = getDatabase(firebase);

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function novoUser(uid, novoNome) {
    const newUserRef = child(ref(database, 'users/'), uid);
    //console.log(newUserRef.key);
    await set(newUserRef, {
      name: novoNome,
      balance: 0
    });
  }

  async function sigUp(email, password, name) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        const email = user.email;

        await novoUser(uid, name)
          .then(() => {
            const data = {
              uid,
              name,
              email
            };
            setUser(data);

          })
        alert("Usuário Cadastrado com sucesso!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          alert('Senha menor que 6 caracteres')
          return;
        }
        if (errorCode === 'auth/invalid-email') {
          alert('Email Inválido')
          return;
        }
        else {
          alert('Ops, algo deu errado!')
          return;
        }
        // ..
      });

    await updateProfile(auth.currentUser, {
      displayName: name,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!

    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, sigUp }}>
      {children}
    </AuthContext.Provider>
  )
}