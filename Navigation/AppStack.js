import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import StockPage from '../Components/StockPage'
import ProfileTab from '../Components/AppTabNavigator/ProfileTab'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Stock Chat' component={HomeScreen} />
      <Stack.Screen name='StockPage' component={StockPage} />
      <Stack.Screen name='Profile' component={ProfileTab}/>
    </Stack.Navigator>
    //might not need to add ProfileTab in Stack.Navigator
    //maybe just in Tab.Navigator
  );
}