import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {Title} from 'react-native-paper';

export default function StockPage(props) {
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyName, setCompanyName] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

  useEffect(() => {
    const {companySymbol, companyName} = props.route.params;
    setCompanySymbol(companySymbol);
    setCompanyName(companyName);
  }, []);

  return (
    <Container style={styles.container}>
      <Content>
        <Title>
          {companySymbol} : {companyName}
        </Title>
      </Content>
    </Container>
  );
}
