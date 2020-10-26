import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
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
        //NetInfo.isConnected.fetch().then(isConnected => {
            if (true) {
                this.setState({isConnected: true})
                this.getHomeScreenData();
            } else {
                this.setState({
                    isLoading: false
                })
            }
        //})
    }

    async getHomeScreenData() {
        try {
            let response = await fetch(
                'http://192.168.1.102:8080/home'
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
                <View key={Post.taken_at_timestamp} style={styles.view}>
                   <CardComponent style={{flex:1}}display_url={Post.display_url} post_text={Post.edge_media_to_caption.edges[0].node.text} />
                </View>
            )
        });

        return (
            <Container style={styles.container}>
                <Content style={styles.context}>
                    {display}
                </Content>
            </Container>
        );
    }
}
export default HomeTab;

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