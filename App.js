import React from 'react';
import { StyleSheet, Text, View, Button, LayoutAnimation} from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
//import { AuthProvider } from './Navigation/AuthProvider';
//import Routes from './Navigation/Routes';
import Providers from './Navigation/index';

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

