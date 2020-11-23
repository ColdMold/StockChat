import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
//import { Title } from 'react-native-paper';
import FormButton from '../FormButton';
import { AuthContext } from '../../Navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import {
  DataTable,
  Title,
  Button,
  Banner,
  Card,
  Paragraph,
  List,
} from 'react-native-paper';

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

  
    return (
        <View style={styles.container}>
          <Title>Welcome {user.displayName}</Title>
          <FormButton
          title='Change password?'
          modeValue='text'
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => navigation.navigate('Reset Password')}
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