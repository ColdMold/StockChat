import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Content} from 'native-base';
import {
  DataTable,
  Title,
  Banner,
  Card,
} from 'react-native-paper';
import compactFormat from 'cldr-compact-number';
import {Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

export default function StockPage(props) {
  const [companySymbol] = useState(
    props.route.params.companySymbol,
  );
  const [companyName] = useState(
    props.route.params.companyName,
  );
  const [favorited, setFavorited] = useState(false);
  const [forumJoined, setForumJoined] = useState(false);
  const [fullTextShown, setFullTextShown] = useState(false);
  const [showMoreShown, setShowMoreShown] = useState(false);
  const [advStatsResponse, setAdvStatsResponse] = useState([]);
  const [companyInfoResponse, setCompanyInfoResponse] = useState([]);
  const [companyIntradayData, setCompanyIntradayData] = useState([]);
  const [initialPageRender, setInitialPageRender] = useState(true);

  const screenWidth = Dimensions.get('window').width;

  const loadCompanyResponses = async (cloud_api_key, sandbox_api_key) => {
    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/advanced-stats?token=${sandbox_api_key}`;
    const companyInfoFetchURL = `https://sandbox.iexapis.com/stable/stock/${companySymbol}/company?token=${sandbox_api_key}`;
    const companyIntradayURL = `https://cloud.iexapis.com/stable/stock/${companySymbol}/intraday-prices?token=${cloud_api_key}&chartLast=390`;
    console.log('intradayURL: ' + companyIntradayURL);
    console.log('advStatsURL: ' + advStatsFetchURL);
    console.log('companyInfoURL: ' + companyInfoFetchURL);

    let advStatsJson = [];
    let companyInfoJson = [];
    let intradayJson = [];
    try {
      await fetch(advStatsFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          advStatsJson = responseJson;
        })
        .then(() => {
          fetch(companyInfoFetchURL)
            .then((response) => response.json())
            .then((responseJson) => {
              companyInfoJson = responseJson;
            })
            .then(() => {
              fetch(companyIntradayURL)
                .then((response) => response.json())
                .then((responseJson) => {
                  intradayJson = responseJson;
                })
                .then(() => {
                  setAdvStatsResponse(advStatsJson);
                  setCompanyInfoResponse(companyInfoJson);
                  setCompanyIntradayData(intradayJson);
                });
            });
        });
    } catch (error) {
      console.error('Loading Responses ' + error);
    }
  };

  // No dependency array, so this hook will act like ComponentDidMount()
  // We want to have a live update eventually on the graph (when graph is implemented)
  useEffect(() => {
    let isMounted = true;

    let sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
    let cloud_api_key = 'pk_5f709541c67045d4baf49eb884efbdda';
    if (isMounted) {
      // loading in company data
      readFavoritesFromDB();
      loadCompanyResponses(cloud_api_key, sandbox_api_key);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  //trying to read favorites from DB on launch
  const readFavoritesFromDB = () => {
    console.log('reading favorites from DB');
    let uid = firebase.auth().currentUser.uid;
    let favoriteRef = database().ref(`${uid}/favorites/${companySymbol}`);
    favoriteRef.once('value', (snapshot) => {
      setInitialPageRender(false);
      console.log('Favorited on read from DB? ' + snapshot.val());
      if (snapshot.val() !== null) {
        setFavorited(snapshot.val());
      }
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      pushOrRemove();
    }

    return () => {
      isMounted = false;
    };
  }, [favorited]);

  const pushOrRemove = () => {
    let uid = firebase.auth().currentUser.uid;

    if (!initialPageRender) {
      if (favorited === true) {
        pushFavoriteDB(uid);
      } else if (favorited === false) {
        removeFavoriteDB(uid);
      }
    }
  };

  const pushFavoriteDB = (uid) => {
    database()
      .ref(`${uid}/favorites`)
      .update({
        [companySymbol]: true,
      });
  };

  const removeFavoriteDB = (uid) => {
    database()
      .ref(`${uid}/favorites`)
      .update({
        [companySymbol]: null,
      });
  };

  const chartDisplay = () => {
    // Right now this logs 3 times, I think because of
    // All 3 loadResponse calls being in the same method
    // Corresponding with 3 separate rerenders
      //console.log('chartDisplay');

    const getDomain = () => {
      const averagePrices = companyIntradayData
        .map((dataPoint) => dataPoint.average)
        .filter((average) => average != null);

      return [
        Math.min(...averagePrices) * 0.99,
        Math.max(...averagePrices) * 1.1,
      ];
    };

    if (companyIntradayData.length > 0) {
      return (
        <View>
          <Title style={styles.priceText}>
            Last Price{': '}
            {
              companyIntradayData.map((dataPoint) => dataPoint.average)[
                companyIntradayData.length - 1
              ]
            }
          </Title>
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

  // TODO: Use these functions to implement behavior when clicking chat/favorites/forums buttons
  // We will have to load in favorites state in useEffect from database
  // and whether or not a user is a part of a forum
  // DECIDE: Do we want to have separations between the stocks a user can
  // favorite and join chat / join forums?
  const navigateToChat = () => {
    props.navigation.navigate('ChatRoom', {
      companySymbol: companySymbol,
    });
  };

  const favoritePressed = () => {
    setFavorited((prevFav) => !prevFav);

    const action = favorited ? 'removed from' : 'added to';
    console.log(`${companySymbol} ${action} Favorites!`);
  };

  const joinChatPressed = () => {
    if (favorited) {
      navigateToChat();
    } else {
      Toast.showWithGravity(
        'You must favorite the stock to chat!',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  const joinForumPressed = () => {
    setForumJoined(!forumJoined);
    const action = forumJoined ? 'left' : 'joined';
    console.log(`You ${action} ${companySymbol} forum!`);
  };

  const bannerDisplay = () => {
    console.log('bannerDisplay()');
    // Main Rendering Return for the Functional Component
    const getActionLabel = (action) => {
      switch (action) {
        case 'favorite':
          return favorited ? 'Remove Favorite' : 'Favorite';
        case 'forum':
          return forumJoined ? 'Leave Forum' : 'Join Forum';
      }
    };

    return (
      <Banner
        visible={true}
        actions={[
          {
            label: 'Chat',
            onPress: () => joinChatPressed(),
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
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Mkt Cap: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {compactFormat(advStatsResponse.marketcap, 'en', null, {
                significantDigits: 3,
                maximumFractionDigits: 4,
              })}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Avg Vol: </Text>
            </DataTable.Cell>
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
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk Low: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.week52low).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk High: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.week52high).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Div/Yield: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {advStatsResponse.dividendYield == null
                ? 'N/A'
                : parseFloat(advStatsResponse.dividendYield).toFixed(3)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Nxt Div: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {advStatsResponse.nextDividendDate == null
                ? 'N/A'
                : advStatsResponse.nextDividendDate}
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>P/E Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {parseFloat(advStatsResponse.peRatio).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EPS (TTM): </Text>
            </DataTable.Cell>
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

  return useMemo(() => {
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
  }, [companyIntradayData, favorited]);
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
  priceText: {
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  statsTitle: {
    fontWeight: 'bold',
  },
});
