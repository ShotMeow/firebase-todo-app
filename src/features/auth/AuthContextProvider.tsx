import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, signOut } from 'firebase/auth';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  logout: () => void 0,
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.setPersistence(browserSessionPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
