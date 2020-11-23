import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import StockPage from '../Components/StockPage';
import ChatRoom from '../Components/Chat/ChatRoom';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {TAB_NAMES} from '../Components/Utils/Constants';

const Stack = createStackNavigator();

export default function AppStack() {
  // Allows us to change header title based on the page we are on
  // Can expand this to header contents later
  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stocks';

    switch (routeName) {
      case TAB_NAMES.stocks:
        return 'Your Stocks';
      case TAB_NAMES.forums:
        return 'Forums';
      case TAB_NAMES.createPost:
        return 'Create A Post';
      case TAB_NAMES.chatMsgs:
        return 'Your Message Rooms';
      case TAB_NAMES.profile:
        return 'Profile';
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stock Chat"
        component={HomeScreen}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="StockPage"
        component={StockPage}
        options={({route}) => ({
          headerTitle: `${route.params.companySymbol}`,
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          title: `${route.params.companySymbol} Chat Room`,
        })}
      />
    </Stack.Navigator>
  );
}
