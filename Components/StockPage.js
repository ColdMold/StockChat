import React from 'react';
import {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {Title} from 'react-native-paper';

class StockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companySymbol: '',
      companyName: '',
    };
  }

  componentDidMount() {
    const {companySymbol, companyName} = this.props.route.params;
    if (true) {
      this.setState({
        companySymbol: companySymbol,
        companyName: companyName,
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Title>
            {this.state.companySymbol} : {this.state.companyName}
          </Title>
        </Content>
      </Container>
    );
  }
}
export default StockPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
