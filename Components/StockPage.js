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

export default function StockPage(props) {
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [chatJoined, setChatJoined] = useState(false);
  const [forumJoined, setForumJoined] = useState(false);
  const [fullTextShown, setFullTextShown] = useState(false);
  const [showMoreShown, setShowMoreShown] = useState(false);

  useEffect(() => {
    const {companySymbol, companyName} = props.route.params;
    setCompanySymbol(companySymbol);
    setCompanyName(companyName);
  }, []);

  // TODO: Use these functions to implement behavior when clicking chat/favorites/forums buttons
  // We will have to load in favorites state in useEffect from database
  // and whether or not a user is a part of a forum
  // DECIDE: Do we want to have separations between the stocks a user can
  // favorite and join chat / join forums?
  const favoritePressed = () => {
    setFavorited(!favorited);
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

  // mock response from https://iexcloud.io/docs/api/#advanced-stats
  const advStatsResponse = {
    companyName: 'Apple Inc.',
    marketcap: 760334287200,
    week52high: 156.65,
    week52low: 93.63,
    week52change: 58.801903,
    sharesOutstanding: 5213840000,
    float: 5203997571,
    avg10Volume: 2774000,
    avg30Volume: 12774000,
    day200MovingAvg: 140.60541,
    day50MovingAvg: 156.49678,
    employees: 120000,
    ttmEPS: 16.5,
    ttmDividendRate: 2.25,
    dividendYield: 0.021,
    nextDividendDate: '2019-03-01',
    exDividendDate: '2019-02-08',
    nextEarningsDate: '2019-01-01',
    peRatio: 14,
    beta: 1.25,
    maxChangePercent: 153.021,
    year5ChangePercent: 0.5902546932200027,
    year2ChangePercent: 0.3777449874142869,
    year1ChangePercent: 0.39751716851558366,
    ytdChangePercent: 0.36659492036160124,
    month6ChangePercent: 0.12208398133748043,
    month3ChangePercent: 0.08466584665846649,
    month1ChangePercent: 0.009668596145283263,
    day30ChangePercent: -0.002762605699968781,
    day5ChangePercent: -0.005762605699968781,
  };

  const companyInfoResponse = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    exchange: 'NASDAQ',
    industry: 'Telecommunications Equipment',
    website: 'http://www.apple.com',
    description:
      'Apple, Inc. engages in the design, manufacture, and marketing of mobile communication, media devices, personal computers, and portable digital music players. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 and is headquartered in Cupertino, CA.',
    CEO: 'Timothy Donald Cook',
    securityName: 'Apple Inc.',
    issueType: 'cs',
    sector: 'Electronic Technology',
    primarySicCode: 3663,
    employees: 132000,
    tags: ['Electronic Technology', 'Telecommunications Equipment'],
    address: 'One Apple Park Way',
    address2: null,
    state: 'CA',
    city: 'Cupertino',
    zip: '95014-2083',
    country: 'US',
    phone: '1.408.974.3123',
  };

  const bannerDisplay = () => {
    // Main Rendering Return for the Functional Component
    const getActionLabel = (action) => {
      switch (action) {
        case 'favorite':
          return favorited ? 'Remove from Favorites' : 'Add to Favorites';
        case 'chat':
          return chatJoined ? 'Leave Chat' : 'Join Chat';
        case 'forum':
          return forumJoined ? 'Leave Forum' : 'Join Forum';
      }
    };

    return (
      <Banner
        visible={true}
        actions={[
          {
            label: getActionLabel('favorite'),
            onPress: () => favoritePressed(),
            mode: 'contained',
            color: 'green',
          },
          {
            label: getActionLabel('forum'),
            onPress: () => joinForumPressed(),
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
            <DataTable.Cell>{advStatsResponse.marketcap}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Avg Vol: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.avg30Volume / 30}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk Low: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.week52low}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk High: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.week52high}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>Div/Yield: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.dividendYield}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Nxt Div: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.nextDividendDate}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>P/E Ratio: </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.peRatio}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>EPS (TTM): </DataTable.Cell>
            <DataTable.Cell>{advStatsResponse.ttmEPS}</DataTable.Cell>
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
