import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';

import { createUser } from './db';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('quick-feedback-auth', true, {
        expires: 1
      });

      // setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove('quick-feedback-auth');

      return false;
    }
  };
  const signinWithGithub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    return handleUser(response.user);
  };

  const signout = async () => {
    await firebase.auth().signOut();
    return handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};
