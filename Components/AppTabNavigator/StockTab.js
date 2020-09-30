import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'

class StockTab extends Component {

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
            let api_key = 'btqadav48v6t9hdd5mag';
            let response = await fetch(
                'https://finnhub.io/api/v1/stock/symbol?exchange=US&token='+api_key
            );
            let json = await response.json();
            this.setState({
                data: json.slice(0, 10)//only get top 10 stocks right now. (Loading problems)
            });
        } catch (error) {
          console.error(error);
        }
      }

    render() {

        let display = this.state.data.map(function (Stock, index) {
            return (
                <View key={Stock.symbol} >
                   <CardComponent description={Stock.description} symbol={Stock.symbol} />
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
export default StockTab;

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