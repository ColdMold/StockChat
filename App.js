import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, LayoutAnimation} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import auth from '@react-native-firebase/auth';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './Navigation/AuthProvider';
import Routes from './Navigation/Routes';

//const Stack = createStackNavigator();

export default class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
    /*
    return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    );
*/
   return (
    <PaperProvider>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </PaperProvider>
  );
    
  }
  

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

