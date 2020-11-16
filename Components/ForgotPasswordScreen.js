import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { AuthContext } from '../Navigation/AuthProvider';

export default function ForgotPasswordScreen({ navigation }) {
    const { forgotPass } = useContext(AuthContext);
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
          <Title style={styles.titleText}>Reset Password Here</Title>
          <FormInput
            labelName='Email'
            value={email}
            autoCapitalize='none'
            onChangeText={userEmail => setEmail(userEmail)}
          />
          <FormButton
            title='Send password reset email'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
                forgotPass(email);
                navigation.navigate('Login');
            }}
          />
          <FormButton
          title='Back to login page'
          modeValue='text'
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => navigation.navigate('Login')}
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