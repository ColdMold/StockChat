import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import StocksTab from './AppTabNavigator/StocksTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ForumsTab from './AppTabNavigator/ForumsTab';
import CreatePostTab from './AppTabNavigator/CreatePostTab';
import ChatMsgsTab from './AppTabNavigator/ChatMsgsTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import {HARDCODED_COMPANY_SYMBOLS_ARRAY, TAB_NAMES} from './Utils/Constants';

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  const [companySymbolsArray] = useState(HARDCODED_COMPANY_SYMBOLS_ARRAY);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={TAB_NAMES.stocks}
        children={() => (
          <StocksTab
            stocks={companySymbolsArray}
            navigation={props.navigation}
          />
        )}
      />
      <Tab.Screen name={TAB_NAMES.forums} component={ForumsTab} />
      <Tab.Screen name={TAB_NAMES.createPost} component={CreatePostTab} />
      <Tab.Screen
        name={TAB_NAMES.chatMsgs}
        children={() => (
          <ChatMsgsTab
            stocks={companySymbolsArray}
            navigation={props.navigation}
          />
        )}
      />
      <Tab.Screen name={TAB_NAMES.profile} component={ProfileTab} />
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
