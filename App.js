import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      
     <View>
       <LoginApp/>
     </View>
/*
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={LoginApp} />
    </Stack.Navigator>
    </NavigationContainer>
  */  

    );
  }

  
  componentDidMount() {
    auth().signInAnonymously().then(() => {
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });
  }

}

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    /*
    <View>
      <Text>Welcome {user.email}</Text>
    </View>*/

    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Stock Chat" component={HomeScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});