import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import StockTab from './AppTabNavigator/StockTab'
import SearchTab from './AppTabNavigator/SearchTab'
import CreatePostTab from './AppTabNavigator/CreatePostTab'
import ForumsTab from './AppTabNavigator/ForumsTab'
import HomeTab from "./AppTabNavigator/HomeTab";
import ChatMsgsTab from "./AppTabNavigator/ChatMsgsTab";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'


const Tab = createBottomTabNavigator();


class MainScreen extends Component {
    static navigationOptions = {

        //headerLeft: <Icon name="ios-camera-outline" style={{ paddingLeft: 10 }} />,
        title: "Stock Chat",
        //headerRight: <Icon style={{ paddingRight: 10 }} name="ios-send-outline" />
    }

    render() {
        return (
                <Tab.Navigator>
                    <Tab.Screen name="Stock" component={StockTab}/>
                    <Tab.Screen name="Forums" component={ForumsTab}/>
                    <Tab.Screen name="Create Post" component={CreatePostTab} />
                    <Tab.Screen name="Chat / Messages" component={ChatMsgsTab} />
                    <Tab.Screen name="Search" component={SearchTab} />
                </Tab.Navigator>
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});