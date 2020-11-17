import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import { List, Title, Divider } from "react-native-paper";

class ChatMsgsTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="android-messages" style={{ color: tintColor }} />
        )
    }

    render() {
        let lastMessage = "Chat Last Message..."
        let chatRooms = this.getChatRooms().map(symbol => {
            return (
                <View key={symbol}>
                    <List.Item
                        title={symbol}
                        description={lastMessage}
                        onPress={() => this.chatRoomPressed(symbol)}
                    />
                    <Divider></Divider>
                </View>
            );
        });

        return (
            <Container>
                <Content>
                    <Title style={styles.title}>Your Chats</Title>
                    {chatRooms}
                </Content>
            </Container>
        );
    }

    getChatRooms() {
        // TODO: Get this from a central location (same as everywhere else)
        let companySymbolsArray = ['AAPL', 'TSLA', 'IBM', 'MSFT', 'NET'];
        return companySymbolsArray;
    }

    chatRoomPressed(symbol) {
        // Will open up to chat room view.
        console.log("Opening " + symbol + " Chat Room");
    }
}
export default ChatMsgsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
    }
});