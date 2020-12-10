import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Paragraph} from 'react-native-paper';

import {Container, Content} from 'native-base';

export default function AboutUsScreen() {
  return (
    <Container>
      <Content>
        <Paragraph>
          <Text style={styles.paragraphText}>
            StockChat is an android application attempting to allow a single
            place for everyone to discuss whatever they want pertaining to
            stocks. Firebase and the IEX API have been a big help to us in
            trying to create this prototype app.
          </Text>
        </Paragraph>
        <Paragraph>
          <Text style={styles.paragraphText}>
            Some future works for this app include implementing a forum feature,
            ability for users to create posts. Another big future work besides
            those two, is for the ability to users to actually discuss all
            stocks, and not just a hardcoded amount of stocks which was done in
            this prototype.
          </Text>
        </Paragraph>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  paragraphText: {
    fontSize: 16,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
