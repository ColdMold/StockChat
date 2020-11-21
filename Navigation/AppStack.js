import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import StockPage from '../Components/StockPage';
import ChatRoom from '../Components/Chat/ChatRoom';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AppStack() {
  let companySymbolsArray = ['AAPL', 'TSLA', 'IBM', 'MSFT', 'NET'];

  // Allows us to change header title based on the page we are on
  // Can expand this to header contents later
  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stocks';

    switch (routeName) {
      case 'Stocks':
        return 'Your Stocks';
      case 'Forums':
        return 'Forums';
      case 'Create Post':
        return 'Create A Post';
      case 'Chat / Messages':
        return 'Your Message Rooms';
      case 'Profile':
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
        screenProps={{
          companies: companySymbolsArray,
        }}
      />
      <Stack.Screen name="StockPage" component={StockPage}/>
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
