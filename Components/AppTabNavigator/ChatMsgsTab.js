import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Container, Content, Icon} from 'native-base';
import {List, Title, Divider} from 'react-native-paper';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class ChatMsgsTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="android-messages" style={{color: tintColor}} />
    ),
  };

  constructor(props) {
    super(props);
    this.willFocusSubscription = null;
    this.state = {
      favoritedCompanies: {
        companySymbols: [],
      },
    };
  }

  componentDidMount() {
    this.readFavorites();

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

  async readFavorites() {
    console.log('reading favorites from DB');
    let uid = firebase.auth().currentUser.uid;
    let favoriteRef = database().ref(`${uid}/favorites/`);
    let favorites = [];
  
    await favoriteRef.once('value', (snapshot) => snapshot.forEach((childSnapshot) => favorites.push(childSnapshot.key)));
    this.setState({
      favoritedCompanies: {
        companySymbols: favorites,
      },
    });
  }

  render() {
    let lastMessage = 'Chat Last Message...';
    let chatRooms = this.getChatRooms().map((symbol) => {
      return (
        <View key={symbol}>
          <List.Item
            title={symbol}
            description={lastMessage}
            onPress={() => this.chatRoomPressed(symbol)}
          />
          <Divider />
        </View>
      );
    });

    return (
      <Container>
        <Content>
          <Title style={styles.title}>Your Chats</Title>
          {chatRooms}
        </Content>
      </Container>
    );
  }

  getChatRooms() {
    // TODO: Get this from a central location (same as everywhere else)
    let companySymbolsArray = this.state.favoritedCompanies.companySymbols;
    return companySymbolsArray;
  }

  chatRoomPressed(symbol) {
    // Will open up to chat room view.
    console.log('Opening ' + symbol + ' Chat Room');

    const {navigation} = this.props;

    navigation.navigate('ChatRoom', {
      companySymbol: symbol,
    });
  }
}
export default ChatMsgsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
