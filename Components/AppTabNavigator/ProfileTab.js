import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../FormButton';
import { AuthContext } from '../../Navigation/AuthProvider';

export default function ProfileTab({ navigation }) {
    const { logout, user } = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
          <Title>Welcome {user.email}</Title>
          <FormButton
            title='Logout'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
                logout();
                //navigation.navigate('Login');
                //might not need navigation, logout should auto go back to login screen
                //cant test until I get import statement fixed..
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