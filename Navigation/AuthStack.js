import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../Components/SignupScreen';
import LoginScreen from '../Components/LoginScreen';
import ForgotPasswordScreen from '../Components/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
