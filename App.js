import React from 'react';
import { StyleSheet, Text, View, Button, LayoutAnimation} from 'react-native';

import Providers from './Navigation/index';

export default class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
   return (
    <Providers/>
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

