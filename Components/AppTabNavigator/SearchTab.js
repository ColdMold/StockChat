import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'

import MenuCardComponent from "../MenuCardComponent"

class SearchTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="search1" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
        };
    }

    componentDidMount() {
        this.setState({isConnected: true})
        this.getHomeScreenData();    
    }

    async getHomeScreenData() {
        try {
            let response = await fetch(
                'http://192.168.1.105:5000/drinks'
            );
            let json = await response.json();
            this.setState({
                data: json
            });
        } catch (error) {
          console.error(error);
        }
      }

    render() {

        let display = this.state.data.map(function (Post, index) {
            return (
                <View key={Post._id.$oid} style={styles.view}>
                   <MenuCardComponent style={{flex:1}} image={Post.image} name={Post.name} price={Post.price} />
                </View>
            )
        });

        return (
            <Container style={styles.container}>
                <Content style={styles.context}>
                    <Text>
                        Search Tab
                    </Text>
                </Content>
            </Container>
        );
    }
}
export default SearchTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    context: {
        flex: 1,
        backgroundColor: 'white'
    },
    view:{
        flex: 1
    }
});