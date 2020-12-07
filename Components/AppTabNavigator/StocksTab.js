import React, {Component} from 'react';
import {Card} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


class StocksTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="android-home" style={{color: tintColor}} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // companyInfo is one big object holding the arrays of company information...might need to change this behavior to maybe having an array of "Company" objects each
      // with their own individual properties.
      companyInfo: {
        companyNames: [],
        companySymbols: [],
      },
      favoritedCompanies: {
        companyNames: [],
        companySymbols: [],
      },
    };
  }

  componentDidMount() {
    if (true) {
      this.getStockCardData();
      this.readFavorites();
    }

    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.readFavorites();
        console.log("BACK BUTTON");
      }
    );

  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentDidUpdate(){
    //this.readFavorites();
  }

  async readFavorites() {
    let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
    console.log('reading favorites from DB');
    let uid = firebase.auth().currentUser.uid;
    let favoriteRef = database().ref(`${uid}/favorites/`);
    let favorites = [];
     await favoriteRef.once('value', (snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.key);
        console.log(childSnapshot.val());
        if(childSnapshot.val() === true) {
          favorites.push(childSnapshot.key);
        }
      });
    });

    let companySymbolsAPI = favorites.join(',').toLowerCase();
      const apiFetchURL = `https://sandbox.iexapis.com/stable/stock/market/batch?&types=quote&symbols=${companySymbolsAPI}&token=${api_key}`;
      let companyNamesAPI = [];
      try {
        let response = await fetch(apiFetchURL);
        let responseJson = await response.json();

        const quotes = Object.values(responseJson).map((stock) => stock.quote);
        const companyNames = quotes.map((quote) => quote.companyName);
        companyNamesAPI = companyNames;
      } catch (error) {
        console.error(error);
      }
      console.log("FAVORITES: " + favorites);
      console.log("FAVORITE NAMES: " + companyNamesAPI);
      this.setState({
        favoritedCompanies: {
          companyNames: companyNamesAPI,
          companySymbols: favorites,
        },
      });
  }
  
  async getStockCardData() {
    // Hard coded api_key. Will need to change this
    let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
    //let api_key = process.env.REACT_APP_IEX_API_KEY;
    //deleted .env for now as it was not even working, and technically is still not even secure

    // Array of company symbols. Ideally we will get this information from the user's liked / purchased stocks.
    let companySymbolsArray = this.props.stocks;

    let companySymbols = companySymbolsArray.join(',').toLowerCase();

    const apiFetchURL = `https://sandbox.iexapis.com/stable/stock/market/batch?&types=quote&symbols=${companySymbols}&token=${api_key}`;

    try {
      let response = await fetch(apiFetchURL);
      let responseJson = await response.json();

      // List of "Quotes" -- to see what this is go to this sample API response:
      // https://sandbox.iexapis.com/stable/stock/market/batch?&types=quote&symbols=aapl,tsla,ibm&token=Tpk_77a598a1fa804de592413ba39f6b137a&period=annual
      const quotes = Object.values(responseJson).map((stock) => stock.quote);
      const companyNames = quotes.map((quote) => quote.companyName);
      // We can just use the passed list of array symbols instead of this map. However, I'll leave this in here for now just in case.
      this.setState({
        companyInfo: {
          companyNames: companyNames,
          companySymbols: companySymbolsArray,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  navigateToPage = (companySymbol, companyName) => {
    const {navigation} = this.props;
    console.log(companySymbol + ' | ' + companyName);

    navigation.navigate('StockPage', {
      companySymbol: companySymbol,
      companyName: companyName,
    });
  };

  render() {
    // Use state because for some reason passing it in and accessing directly using array was undefined
    // State updates after the code runs. Will need to do more reading on using update callback or componentDidMount / Update.
    let companyNames = this.state.companyInfo.companyNames;
    let companySymbols = this.state.companyInfo.companySymbols;
    let favCompNames = this.state.favoritedCompanies.companyNames;
    let favCompSymbols = this.state.favoritedCompanies.companySymbols;

    let _this = this;

    let display = companyNames.map(function (companyName, index) {
      const companySymbol = companySymbols[index];
      return (
        <View key={companySymbol}>
          <Card
            style={styles.card}
            onPress={() => _this.navigateToPage(companySymbol, companyName)}>
            <Card.Title title={companySymbol} subtitle={companyName} />
          </Card>
        </View>
      );
    });

    let favDisplay = favCompNames.map(function (compNames, index) {
      const favCompSymbol = favCompSymbols[index];
      return (
        <View key={favCompSymbol}>
          <Card
            style={styles.card}
            onPress={() => _this.navigateToPage(favCompSymbol, compNames)}>
            <Card.Title title={favCompSymbol} subtitle={compNames} />
          </Card>
        </View>
      );
    });

    return (
      <Container style={styles.container}>
        {/*<NavigationEvents onDidFocus={() => console.log('DID FOCUS')}/>*/}
        <Text>My Favorites</Text>
        <Content style={styles.context}>{favDisplay}</Content>
        <Text>All Stocks</Text>
        <Content style={styles.context}>{display}</Content>
      </Container>
    );
  }
}
export default StocksTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  context: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
  },
  card: {
    borderWidth: 3,
    margin: 2,
  },
});
