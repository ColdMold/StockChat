import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {AuthContext} from '../Navigation/AuthProvider';
import FormButton from './FormButton';
import StocksTab from './AppTabNavigator/StocksTab';
import SearchTab from './AppTabNavigator/SearchTab';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ForumsTab from './AppTabNavigator/ForumsTab';
import CreatePostTab from './AppTabNavigator/CreatePostTab';
import ChatMsgsTab from './AppTabNavigator/ChatMsgsTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Stocks"
        component={StocksTab}
        options={{
          title: 'Stocks',
        }}
      />
      <Tab.Screen name="Forums" component={ForumsTab} />
      <Tab.Screen name="Create Post" component={CreatePostTab} />
      <Tab.Screen name="Chat / Messages" component={ChatMsgsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
