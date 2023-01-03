import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { child, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

import { firebase } from '../services/firebase/connection'

const auth = getAuth(firebase);
const database = getDatabase(firebase);

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      try {
        const jsonValue = await AsyncStorage.getItem('@Auth_user')
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(user);

      } catch (e) {
        // error reading value
      }
      finally {
        setLoading(false);
      }
    }

    loadStorage();
  }, [])

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
            storageUser(data)

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

  async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;

        const usuariosRef = ref(database, 'users/' + uid);
        onValue(usuariosRef, (snapshot) => {
          const data = snapshot.val();
          const name = data.name;

          const dataUser = {
            uid,
            name,
            email
          };
          setUser(dataUser);
          storageUser(dataUser)
        }, {
          onlyOnce: true
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        return;

        // ..
      });

  }

  async function storageUser(value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@Auth_user', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, sigUp, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  )
}