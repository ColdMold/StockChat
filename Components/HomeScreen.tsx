import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import StockTab from './AppTabNavigator/StockTab'
import SearchTab from './AppTabNavigator/SearchTab'
import AddMediaTab from './AppTabNavigator/AddMediaTab'
import LikesTab from './AppTabNavigator/LikesTab'
import ProfileTab from './AppTabNavigator/ProfileTab'

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
                    <Tab.Screen name="Stock" component={StockTab} />
                    <Tab.Screen name="Search" component={SearchTab} />
                    <Tab.Screen name="Add Media" component={AddMediaTab} />
                    <Tab.Screen name="Likes" component={LikesTab} />
                    <Tab.Screen name="Profile" component={ProfileTab} />
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