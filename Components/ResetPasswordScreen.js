import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormButton from './FormButton';
import FormInput from './FormInput';
import { firebase } from '@react-native-firebase/auth';

export default function ResetPasswordScreen({ navigation }) {
    const [userPassword, setUserPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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

      return(
        <View style={styles.container}>
          <Title>Reset Password</Title>
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
                  navigation.navigate('Profile')
                } catch(error) {
                  alert(error);
a                }
            }}
          />
          <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        color='#6646ee'
        onPress={() => navigation.navigate('Profile')}
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