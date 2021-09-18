import { createContext, useEffect, useState } from "react";
import firebase from "firebase/compat";
import { auth } from "../services/firebase";

// Declaração das tipagens
type UserType = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
  // SignOut: () => Promise<void>;
};
type ChildrenType = {
  children: React.ReactNode;
};

// Criação do Contexto de Autenticação para todo App;
export const AuthContext = createContext({} as AuthContextType);

// Criação do Provedor para o contexto;
export function AuthContextProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<UserType>();
  // const history = useHistory()

  // recuperando estado da autenticação no firebase;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error("Faltando informações da conta do Google");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
      return () => {
        unsubscribe();
      };
    });
  }, []);

  // Função para autenticação utilizando firebase com Google Autenticator
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Faltando informações da conta do Google");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  // async function SignOut() {
  //   await auth.signOut();
  //   history.push(`/`)
  // }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
