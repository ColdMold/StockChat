import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import StockPage from '../Components/StockPage'
import ChatRoom from '../Components/Chat/ChatRoom';
import ProfileTab from '../Components/AppTabNavigator/ProfileTab';
import ResetPasswordScreen from '../Components/ResetPasswordScreen';
import AboutUsScreen from '../Components/AboutUsScreen'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Stock Chat' component={HomeScreen} />
      <Stack.Screen name='StockPage' component={StockPage} />
      <Stack.Screen name='ChatRoom' component={ChatRoom} options={({ route }) => ({
        title: `${route.params.companySymbol} Chat Room`
      })}/>
      <Stack.Screen name ='Reset Password' component={ResetPasswordScreen}/>
      <Stack.Screen name = 'About Us' component={AboutUsScreen}/>
      <Stack.Screen name ='Profile' component={ProfileTab}/>
    </Stack.Navigator>
  );
}