import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Icon} from 'native-base';

class ForumsTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="forum-outline" style={{color: tintColor}} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Forums</Text>
      </View>
    );
  }
}

export default ForumsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
