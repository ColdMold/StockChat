import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Title, List, Banner, Paragraph, Card} from 'react-native-paper';
import {AuthContext} from '../../Navigation/AuthProvider';
import {Container, Content} from 'native-base';

export default function ProfileTab({navigation}) {
  const {logout, user, setUser} = useContext(AuthContext);

  const bannerDisplay = () => {
    return (
      <Banner
        visible={true}
        actions={[
          {
            label: 'About Us',
            onPress: () => navigation.navigate('About Us'),
            mode: 'contained',
          },
          {
            label: 'Change Password',
            onPress: () => navigation.navigate('Reset Password'),
            mode: 'contained',
            color: 'green',
          },
          {
            label: 'Logout',
            onPress: () => logout(),
            mode: 'contained',
            color: 'purple',
          },
        ]}>
        <Title style={styles.title}>Welcome {user.displayName}</Title>
      </Banner>
    );
  };

  const faqDisplay = () => {
    return (
      <View>
        <Title>FAQ:</Title>
        <Card>
          <Card.Title title="Why are there barely any stocks?" />
          <Card.Content>
            <Text>
              Due to current costs of using external APIs, our development team
              can not provide all the stocks available. Stick with us!
            </Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title
            title="Why are there gaps in some of my stock's graphs?"
            titleNumberOfLines={2}
          />
          <Card.Content>
            <Text>
              Because the API used in this app returns null for some data points
              sometimes :(
            </Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="Why can't I join a chat for a stock?" />
          <Card.Content>
            <Text>
              You must favorite a stock to be able to join the chat room for it!
            </Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="Where are the forums?" />
          <Card.Content>
            <Text>They are coming soon!</Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title
            title="Why can't I make a post about my favorite stock?"
            titleNumberOfLines={2}
          />
          <Card.Content>
            <Text>That would be cool, and you can do it soon!</Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="How do I get my chat to update live?" />
          <Card.Content>
            <Text>
              It's a small bug! Scroll up and down to update, or exit and re
              enter the chat for updates!
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  function onAuthStateChanged(user) {
    setUser(user);
  }

  return (
    <Container style={styles.container}>
      <Content>
        {bannerDisplay()}
        {faqDisplay()}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
