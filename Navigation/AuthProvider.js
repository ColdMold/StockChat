import React, { createContext, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          register: async (username, email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                if(userCredentials.user) {
                  userCredentials.user.updateProfile({
                    displayName: username
                  });
                }
              });
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              console.error(e);
            }
          },
          forgotPass: async (email) => {
            try {
              await auth().sendPasswordResetEmail(email);
              console.log("email sent");
            } catch (e) {
              console.error(e);
              //can we use react components here to display error?
              //or do we need to pass errors as part of the state to get access to them in the different screens?
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };