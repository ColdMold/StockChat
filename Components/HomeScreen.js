import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../Navigation/AuthProvider';
import FormButton from './FormButton';
import StockTab from './AppTabNavigator/StockTab'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import ForumsTab from './AppTabNavigator/ForumsTab';
import CreatePostTab from './AppTabNavigator/CreatePostTab';
import ChatMsgsTab from './AppTabNavigator/ChatMsgsTab';


const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  navigationOptions = {

    //headerLeft: <Icon name="ios-camera-outline" style={{ paddingLeft: 10 }} />,
    title: "Stock Chat",
    //headerRight: <Icon style={{ paddingRight: 10 }} name="ios-send-outline" />
}

  function Logout() {
    return(
      <View style={styles.container}>
      <Title>Home Screen</Title>
      <Title>All chat rooms will be listed here</Title>
      <Title>{user.uid}</Title>
      <FormButton
        modeValue='contained'
        title='Logout'
        onPress={() => logout()}
      />
    </View>
    );
    
}

  return (
    <Tab.Navigator>
        <Tab.Screen name="Stock" component={StockTab} />
        <Tab.Screen name="Forums" component={ForumsTab} />
        <Tab.Screen name="Create Post" component={CreatePostTab} />
        <Tab.Screen name="Chat / Messages" component={ChatMsgsTab} />
        <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});