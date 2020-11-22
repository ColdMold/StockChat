import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../FormButton';
import FormInput from '../FormInput';
import { AuthContext } from '../../Navigation/AuthProvider';
import auth, { firebase } from '@react-native-firebase/auth';

export default function ProfileTab({ navigation }) {
    const { logout, user, setUser } = useContext(AuthContext);
    const [userPassword, setUserPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function onAuthStateChanged(user) {
      setUser(user);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, [user]);

    reaunthenticate = (currentPassword) => {
      let user = firebase.auth().currentUser;
      let cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    }

    changePassword = (currentPassword, newPassword) => {
      this.reaunthenticate(currentPassword).then(() => {
        let user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
        }).catch((error) => {
          alert(error);
        });
      }).catch((error) => {
        alert(error);
      })
    }

  
    return (
        <View style={styles.container}>
          <Title>Welcome {user.displayName}</Title>
          <FormInput
          labelName='Current Password'
          value={userPassword}
          autoCapitalize='none'
          onChangeText={userPassword => setUserPassword(userPassword)}
        />
        <FormInput
          labelName='New Password'
          value={newPassword}
          autoCapitalize='none'
          onChangeText={newPassword => setNewPassword(newPassword)}
        />
          <FormButton
            title='Update Password'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
                try {
                  changePassword(userPassword, newPassword);
                } catch(error) {
                  //Toast.showWithGravity(error, Toast.TOP);
                  console.log(error);
                }
                //navigation.navigate('Login');
                //might not need navigation, logout should auto go back to login screen
            }}
          />
          <FormButton
            title='Logout'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
                logout();
                //navigation.navigate('Login');
                //might not need navigation, logout should auto go back to login screen
            }}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10
    },
    loginButtonLabel: {
      fontSize: 22
    },
    navButtonText: {
      fontSize: 16
    }
  });