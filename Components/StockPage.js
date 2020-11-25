import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Content} from 'native-base';
import {
  DataTable,
  Title,
  Button,
  Banner,
  Card,
  Paragraph,
  List,
} from 'react-native-paper';
import compactFormat from 'cldr-compact-number';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function StockPage(props) {
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [chatJoined, setChatJoined] = useState(false);
  const [forumJoined, setForumJoined] = useState(false);
  const [fullTextShown, setFullTextShown] = useState(false);
  const [showMoreShown, setShowMoreShown] = useState(false);
  const [advStatsResponse, setAdvStatsResponse] = useState([]);
  const [companyInfoResponse, setCompanyInfoResponse] = useState([]);

  const loadCompanyResponses = async (api_key) => {
    const {companySymbol, companyName} = props.route.params;
    setCompanySymbol(companySymbol);
    setCompanyName(companyName);

    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/advanced-stats?token=${api_key}`;
    console.log(advStatsFetchURL);
    try {
      await fetch(advStatsFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setAdvStatsResponse(responseJson);
        });
    } catch (error) {
      console.error(error);
    }

    const companyInfoFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/company?token=${api_key}`;
    console.log(companyInfoFetchURL);
    try {
      await fetch(companyInfoFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyInfoResponse(responseJson);
        });
    } catch (error) {
      console.error(error);
    }
  };


  // No dependency array, so this hook will act like ComponentDidMount()
  // We want to have a live update eventually on the graph (when graph is implemented)
  useEffect(() => {
    // Hard coded api_key. Will need to change this
    let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
    loadCompanyResponses(api_key);
  }, []);

  
 
    /*if(favorited) {
      pushFavoriteDB();
    } else {
      removeFavoriteDB();
    }*/
 
  let isMounted = true;
  useEffect(() => {
    console.log(favorited + 'USE EFFECT');
    if(isMounted) {
      if(favorited) {
        pushFavoriteDB();
     } else {
        removeFavoriteDB();
     }
    }

    return () => {
      console.log(favorited + 'USE EFFECT RETURN');
      isMounted = false;
    }
  }, [favorited]);


  const pushFavoriteDB = () => {
    let uid = firebase.auth().currentUser.uid;
    const newFavorite = database()
        .ref(`/${uid}/favorites`)
        .set({
          [companySymbol]: true,
        });
        console.log('successful push to db');
  }

  const removeFavoriteDB = () => {
    let uid = firebase.auth().currentUser.uid;
    const deleteFavorite = database()
        .ref(`/${uid}/favorites`)
        .set({
          [companySymbol]: false,
        });
  }

  // TODO: Use these functions to implement behavior when clicking chat/favorites/forums buttons
  // We will have to load in favorites state in useEffect from database
  // and whether or not a user is a part of a forum
  // DECIDE: Do we want to have separations between the stocks a user can
  // favorite and join chat / join forums?

  const favoritePressed = () => {
    //console.log(favorited);
    setFavorited(!favorited);
     
    //console.log(favorited);
    const action = favorited ? 'removed from' : 'added to';
    console.log(`${companySymbol} ${action} Favorites!`);
  };

  const joinChatPressed = () => {
    setChatJoined(!chatJoined);
    const action = chatJoined ? 'left' : 'joined';
    console.log(`You ${action} ${companySymbol} chat!`);
  };

  const joinForumPressed = () => {
    setForumJoined(!forumJoined);
    const action = forumJoined ? 'left' : 'joined';
    console.log(`You ${action} ${companySymbol} forum!`);
  };

  const bannerDisplay = () => {
    // Main Rendering Return for the Functional Component
    const getActionLabel = (action) => {
      switch (action) {
        case 'favorite':
          return favorited ? 'Remove Favorite' : 'Favorite';
        case 'chat':
          return chatJoined ? 'Leave Chat' : 'Join Chat';
        case 'forum':
          return forumJoined ? 'Leave Forum' : 'Join Forum';
      }
    };

    const navigateToChat = () => {
      props.navigation.navigate('ChatRoom', {
        companySymbol: companySymbol,
      });
    };

    return (
      <Banner
        visible={true}
        actions={[
          {
            label: 'Chat',
            onPress: () => navigateToChat(),
            mode: 'contained',
          },
          {
            label: getActionLabel('forum'),
            onPress: () => joinForumPressed(),
            mode: 'contained',
            color: 'green',
          },
          {
            label: getActionLabel('favorite'),
            onPress: () => favoritePressed(),
            mode: 'contained',
            color: 'green',
          },
        ]}>
        <Title style={styles.title}>{companyName}</Title>
      </Banner>
    );
  };

  // TODO IDEAS HERE:
  // 1. Add a function to FORMAT the response returns in the table
  //    Will need to format numbers like avg30volume / 30 to 4 digits
  //    Format mkt cap from 8,000,000,000 to 8B, and so on and so forth

  // 2. Create custom data table component to make this look cleaner
  //    and more understandable

  // 3. Explain what each stat means when hovering over the cell
  // 4. Add styling to the category text (mkt cap, avg vol, etc.) to
  //    help user discern between categories and values.
  // 5. Add expansion if a user wants to view "more stats".
  const dataTableDisplay = () => {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Stats</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>Mkt Cap: </DataTable.Cell>
            <DataTable.Cell>
              {compactFormat(advStatsResponse.marketcap, 'en', null, {
                significantDigits: 3,
                maximumFractionDigits: 4,
              })}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Avg Vol: </DataTable.Cell>
            <DataTable.Cell>
              {compactFormat(advStatsResponse.avg30Volume / 30, 'en', null, {
                significantDigits: 3,
                maximumFractionDigits: 4,
              })}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk Low: </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.week52low).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk High: </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.week52high).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>Div/Yield: </DataTable.Cell>
            <DataTable.Cell>
              {advStatsResponse.dividendYield == null
                ? 'N/A'
                : parseFloat(advStatsResponse.dividendYield).toFixed(3)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Nxt Div: </DataTable.Cell>
            <DataTable.Cell>
              {advStatsResponse.nextDividendDate == null
                ? 'N/A'
                : advStatsResponse.nextDividendDate}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>P/E Ratio: </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.peRatio).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>EPS (TTM): </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.ttmEPS).toFixed(3)}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  const onTextLayout = useCallback((e) => {
    setShowMoreShown(e.nativeEvent.lines.length >= 4);
  }, []);

  const toggleShowMore = () => {
    setFullTextShown(!fullTextShown);
  };

  const descriptionTextDisplay = () => {
    return (
      <Card>
        <Card.Title title="About" />
        <Card.Content>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={fullTextShown ? undefined : 4}
            style={styles.aboutText}>
            {companyInfoResponse.description}
          </Text>
          {showMoreShown ? (
            <Text onPress={toggleShowMore} style={styles.showMoreText}>
              {fullTextShown ? 'Show less...' : 'Show more...'}
            </Text>
          ) : null}
        </Card.Content>
      </Card>
    );
  };

  // We don't have a join chat because adding a stock to favorites
  // joins their chat
  return (
    <Container style={styles.container}>
      <Content>
        {bannerDisplay()}
        {dataTableDisplay()}
        {descriptionTextDisplay()}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
  },
  button: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  card: {
    borderColor: 'black',
  },
  aboutText: {
    lineHeight: 21,
  },
  showMoreText: {
    lineHeight: 21,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});
