import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {DataTable, Title} from 'react-native-paper';

export default function StockPage(props) {
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const {companySymbol, companyName} = props.route.params;
    setCompanySymbol(companySymbol);
    setCompanyName(companyName);
  }, []);

  // mock response from https://iexcloud.io/docs/api/#advanced-stats
  const mockJsonResponse = {
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
            <DataTable.Cell>{mockJsonResponse.marketcap}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Avg Vol: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.avg30Volume / 30}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk Low: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.week52low}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>52 Wk High: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.week52high}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>Div/Yield: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.dividendYield}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>Nxt Div: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.nextDividendDate}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>P/E Ratio: </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.peRatio}</DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>EPS (TTM): </DataTable.Cell>
            <DataTable.Cell>{mockJsonResponse.ttmEPS}</DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  // Main Rendering Return for the Functional Component
  return (
    <Container style={styles.container}>
      <Content>
        <Title style={styles.title}>
          {companySymbol} : {companyName}
        </Title>
        {dataTableDisplay()}
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
    borderColor: 'black',
  },
});
