import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from '../services/firebase';

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: AuthContextProviderProps) => {

    const [user, setUser] = useState<User>();

    const setUserWhenExists = (user: firebase.User | null) => {
        if (user) {
            const { displayName, photoURL, uid } = user;
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            })
        }
    }

    // Para 'persistencia' dos dados de login
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserWhenExists(user);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    //Faz a autenticação com Google via firebase, abre um popUp para login
    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        console.log(result);
        setUserWhenExists(result.user);
    }

    /*
    //Faz o logout do usuario
    async function signOut() {
        await auth.signOut();
    }
    */

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export default AuthContextProvider;