import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
              alert(error);
            });
        },
        register: async (username, email, password) => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
              if (userCredentials.user) {
                userCredentials.user.updateProfile({
                  displayName: username,
                });
              }
            })
            .catch((error) => {
              alert(error);
            });
        },
        logout: async () => {
          await auth()
            .signOut()
            .catch((error) => {
              alert(error);
            });
        },
        forgotPass: async (email) => {
          await auth()
            .sendPasswordResetEmail(email)
            .catch((error) => {
              alert(error);
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
