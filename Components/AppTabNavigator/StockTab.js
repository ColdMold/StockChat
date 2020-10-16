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
        let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a'
        let companySymbol = 'AAPL'
    
        try {
            let response = await fetch(
                `https://sandbox.iexapis.com/stable/stock/${companySymbol}/company?token=${api_key}&period=annual`
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
        let companyName = this.state.data.companyName;

        // BRING BACK THIS FORMAT WHENEVER PULLING IN A BATCH OF COMPANIES
        /*
        let display = this.state.data.map(function (Stock, index) {
            return (
                <View key={Stock.symbol} >
                   <CardComponent description={Stock.description} symbol={Stock.symbol} />
                </View>
            )
        });
        */

        return (
            <Container style={styles.container}>
                <Content style={styles.context}>
                    <Text>Stock Screen</Text>
                    <CardComponent description={companyName} symbol={'AAPL'} />
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