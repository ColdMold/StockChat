import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Header, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Content>
                    <View>
                        <Card containerStyle={{padding: 0}}>
                            <CardItem>
                                <Header style={{flex:1 }}>
                                    <Text>
                                        {this.props.symbol}
                                    </Text>
                                </Header>
                                <Body style={{flex:1 }}>
                                    <Text>
                                        {this.props.description}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});