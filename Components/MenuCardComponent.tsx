import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import NetInfo from "react-native-netinfo"

import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class MenuCardComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Content>
                    <View>
                        <Card containerStyle={{padding: 0}}>
                            <CardItem cardBody>
                                <Image source={{uri: this.props.image}}style={{ height: 300, width: null, flex: 1 }} />
                                <Text>
                                        {this.props.name}
                                </Text>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Text>
                                        {this.props.price}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
        );
    }
}
export default MenuCardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});