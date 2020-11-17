import React, { Component } from "react";
import { Card } from 'react-native-paper';

import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import { useNavigation } from "@react-navigation/native";

class StocksTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="android-home" style={{ color: tintColor }} />
        ) 
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // companyInfo is one big object holding the arrays of company information...might need to change this behavior to maybe having an array of "Company" objects each 
            // with their own individual properties.
            companyInfo: {
                companyNames: [],
                companySymbols: []
            }
        };
    }

    componentDidMount() {
        //NetInfo.isConnected.fetch().then(isConnected => {
            if (true) {
                this.setState({isConnected: true})
                this.getStockCardData();
            } else {
                this.setState({
                    isLoading: false
                })
            }
        //})
    }

    async getStockCardData() {
        // Hard coded api_key. Not sure if we will need to change this.
        let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a'

        // Array of company symbols. Ideally we will get this information from the user's liked / purchased stocks.
        let companySymbolsArray = ['AAPL', 'TSLA', 'IBM', 'MSFT', 'NET']
    
        let companySymbols = companySymbolsArray.join(',').toLowerCase();

        const apiFetchURL = `https://sandbox.iexapis.com/stable/stock/market/batch?&types=quote&symbols=${companySymbols}&token=${api_key}`

        try {
            let response = await fetch(apiFetchURL);
            let responseJson = await response.json();

            // List of "Quotes" -- to see what this is go to this sample API response:  
            // https://sandbox.iexapis.com/stable/stock/market/batch?&types=quote&symbols=aapl,tsla,ibm&token=Tpk_77a598a1fa804de592413ba39f6b137a&period=annual
            const quotes = Object.values(responseJson).map(stock => stock.quote);
            const companyNames = quotes.map(quote => quote.companyName);
            // We can just use the passed list of array symbols instead of this map. However, I'll leave this in here for now just in case.
            const companySymbols = quotes.map(quote => quote.symbol);

            this.setState({
                companyInfo: {
                    companyNames: companyNames,
                    companySymbols: companySymbolsArray
                }
            });
        } catch (error) {
          console.error(error);
        }
      }

    navigateToPage = (companySymbol, companyName) => {
        const { navigation } = this.props;
        console.log(companySymbol + " | " + companyName);
        
        navigation.navigate('StockPage', {
            companySymbol: companySymbol,
            companyName: companyName
        });
    }

    render() {
        // Use state because for some reason passing it in and accessing directly using array was undefined
        // State updates after the code runs. Will need to do more reading on using update callback or componentDidMount / Update.
        let companyNames = this.state.companyInfo.companyNames;
        let companySymbols = this.state.companyInfo.companySymbols;

        let _this = this;

        let display = companyNames.map(function (companyName, index) {
            const companySymbol = companySymbols[index];
            return (
                <View key={companySymbol}>
                    <Card style={styles.card} onPress={() => _this.navigateToPage(companySymbol, companyName)}>
                        <Card.Title title={companySymbol} subtitle={companyName}/>
                    </Card>
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
export default StocksTab;

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
    },
    card: {
        borderWidth: 3,
        margin: 2
    }
});