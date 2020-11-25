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
import {Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryContainer,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function StockPage(props) {
  const [companySymbol, setCompanySymbol] = useState(
    props.route.params.companySymbol,
  );
  const [companyName, setCompanyName] = useState(
    props.route.params.companyName,
  );
  const [favorited, setFavorited] = useState(false);
  const [chatJoined, setChatJoined] = useState(false);
  const [forumJoined, setForumJoined] = useState(false);
  const [fullTextShown, setFullTextShown] = useState(false);
  const [showMoreShown, setShowMoreShown] = useState(false);
  const [advStatsResponse, setAdvStatsResponse] = useState([]);
  const [companyInfoResponse, setCompanyInfoResponse] = useState([]);
  const [companyIntradayData, setCompanyIntradayData] = useState([]);

  const screenWidth = Dimensions.get('window').width;

  // TODO: place each of these into their own method
  // I think it's causing the app to rerender on each load
  const loadCompanyResponses = async (api_key) => {
    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/advanced-stats?token=${api_key}`;
    console.log('advStatsURL: ' + advStatsFetchURL);
    try {
      await fetch(advStatsFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setAdvStatsResponse(responseJson);
        });
    } catch (error) {
      console.error('Load1: ' + error);
    }

    const companyInfoFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/company?token=${api_key}`;
    console.log('companyInfoURL: ' + companyInfoFetchURL);
    try {
      await fetch(companyInfoFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyInfoResponse(responseJson);
        });
    } catch (error) {
      console.error('Load2: ' + error);
    }

    // TODO: Test if we can get live updates based on the response
    // Using ACTUAL intraday endpoint - it doesn't change until it updates
    // accurate data ... sandbox changes every second randomizing data
    const companyIntradayURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/intraday-prices?token=${api_key}&chartLast=390`;
    console.log('intradayURL: ' + companyIntradayURL);
    try {
      await fetch(companyIntradayURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyIntradayData(responseJson);
        });
    } catch (error) {
      console.error('Load3: ' + error);
    }
  };

  // No dependency array, so this hook will act like ComponentDidMount()
  // We want to have a live update eventually on the graph (when graph is implemented)
  useEffect(() => {
    let isMounted = true;
    // Hard coded api_key. Will need to change this
    let api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
    if (isMounted) {
      loadCompanyResponses(api_key);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let uid = firebase.auth().currentUser.uid;

      if (favorited) {
        pushFavoriteDB(uid);
      } else {
        removeFavoriteDB(uid);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [favorited]);

  const pushFavoriteDB = (uid) => {
    const newFavorite = database()
      .ref(`${uid}/favorites`)
      .update({
        [companySymbol]: true,
      });
    console.log('successful push to db');
  };

  const removeFavoriteDB = (uid) => {
    const deleteFavorite = database()
      .ref(`${uid}/favorites`)
      .update({
        [companySymbol]: null,
      });
  };

  // TODO: Use these functions to implement behavior when clicking chat/favorites/forums buttons
  // We will have to load in favorites state in useEffect from database
  // and whether or not a user is a part of a forum
  // DECIDE: Do we want to have separations between the stocks a user can
  // favorite and join chat / join forums?
  const favoritePressed = () => {
    console.log(favorited);
    setFavorited(!favorited);

    console.log(favorited);
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

  const chartDisplay = () => {
    // Right now this logs 3 times, I think because of
    // All 3 loadResponse calls being in the same method
    // Corresponding with 3 separate rerenders
    console.log('chartDisplay');

    const getDomain = () => {
      const averagePrices = companyIntradayData
        .map((dataPoint) => dataPoint.average)
        .filter((average) => average != null);

      return [
        Math.min(...averagePrices) * 0.98,
        Math.max(...averagePrices) * 1.2,
      ];
    };

    if (companyIntradayData.length > 0) {
      return (
        <View>
          <VictoryChart
            minDomain={{y: getDomain()[0]}}
            domain={companyIntradayData.length > 0 ? null : {y: getDomain()}}
            width={screenWidth}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({datum}) => `${datum.average}`}
              />
            }>
            <VictoryAxis fixLabelOverlap={true} />
            <VictoryAxis dependentAxis />
            <VictoryLine
              data={companyIntradayData.filter((dataPoint) => {
                let minutes = dataPoint.minute.split(':')[1];
                return minutes % 5 === 0;
              })}
              y={(datum) => datum.average}
              x={(datum) => datum.minute}
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              labelComponent={<VictoryLabel text={''} />}
            />
          </VictoryChart>
        </View>
      );
    }
  };

  const bannerDisplay = () => {
    console.log('bannerDisplay()');
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
  // 2. Create custom data table component to make this look cleaner
  //    and more understandable

  // 3. Explain what each stat means when hovering over the cell
  // 4. Add styling to the category text (mkt cap, avg vol, etc.) to
  //    help user discern between categories and values.
  // 5. Add expansion if a user wants to view "more stats".
  const dataTableDisplay = () => {
    console.log('dataTableDisplay()');

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
    console.log('descriptionTextDisplay()');

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
        {chartDisplay()}
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
  chartView: {
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
});
