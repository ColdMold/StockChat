import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import StockPage from '../Components/StockPage'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Stock Chat' component={HomeScreen} />
      <Stack.Screen name='StockPage' component={StockPage} />
    </Stack.Navigator>
  );
}