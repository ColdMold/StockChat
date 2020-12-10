import {firebase} from '@react-native-firebase/auth';
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {View} from 'react-native';

export default function ChatRoom(props) {
  const [messages, setMessages] = useState([]);

  // pull this id from firebase in a central location state, so we don't
  // end up calling user id multiple times for each different chat room
  //_id: firebase.auth().currentUser...
  const [userId, fetchUserId] = useState('');

  // Passed in from ChatMsgsTab when you click on the Chat Room
  // Will have to do the same thing from Stock Card Page
  const {companySymbol} = props.route.params;

  /* MESSAGES CLASS used by GiftedChat
        _id: string | number --> ID for the specific message
        text: string --> Message text
        createdAt: Date | number --> When a message was created -- new Date(Date.UTC(2016, 5, 11, 17, 20, 0))
        user: User --> The User who sent the message
            _id: string | number --> user ID
            name?: string --> user name
            avatar?: string | number | renderFunction --> user avatar
        image?: string --> Image if sent
        video?: string --> Video if sent
        audio?: string --> Audio if sent
        system?: boolean --> Marker for "system message (announcements)"
        sent?: boolean --> Whether a message was sent
        received?: boolean --> Whether a message was received
        pending?: boolean --> Whether a message is pending
        quickReplies?: QuickReplies --> IDK, probably don't need
    */

  // ONE IDEA: every time we call from firebase, log
  // WHAT we're grabbing (console.log('fetching user id from firebase auth'))
  // So we can see if we do things a redundant amount of times
  const getUserId = () => {
    return firebase.auth().currentUser.uid;
  };

  // IDEA: take advantage of multiple useEffects for
  // live updates possibly?
  useEffect(() => {
    // Gets User ID
    fetchUserId(getUserId());

    const messagesRef = firebase.database().ref(`${companySymbol}Messages`);
    messagesRef.off();

    let loadedMessages = [];

    loadMessages(messagesRef, loadedMessages);

    return () => {
      messagesRef.off();
    };
  }, []);

  const loadMessages = async (messagesRef, loadedMessages) => {
    messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      const iMessage = {
        _id: message._id,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      };
      loadedMessages.push(iMessage);
      loadedMessages.sort(
        (message1, message2) => message2.createdAt - message1.createdAt,
      );
      setMessages(loadedMessages);
    };
    messagesRef.on('child_added', onReceive);
  };

  // This is what is used when send is pressed. We will have to
  // on successful send, upload the message to the database
  const onSend = useCallback(
    (message = []) => {
      // it appears only one message is sent at a time, so we access using messages[0]
      // try moving this to .then
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message),
      );

      // Upon clicking send, the message is uploaded to firebase RTDB
      // as a tree under (if AAPL is the company chat room)
      // AAPLMessages/MessageId/...
      const newMessage = database()
        .ref(`/${companySymbol}Messages/${message[0]._id}`)
        .set({
          _id: message[0]._id,
          text: message[0].text,
          createdAt: `${message[0].createdAt}`,
          user: {
            _id: userId,
            name: 'testUsername',
          },
        });
    },
    [companySymbol, userId],
  );

  const renderBubble = (bubbleProps) => {
    return (
      <View>
        <Bubble
          {...bubbleProps}
          textStyle={{
            left: {
              color: 'white',
            },
            right: {
              color: 'white',
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#535150',
            },
          }}
        />
      </View>
    );
  };

  return (
    <GiftedChat
      renderUsernameOnMessage={true}
      renderBubble={(bubbleSettings) => renderBubble(bubbleSettings)}
      messages={messages}
      onSend={(message) => onSend(message)}
      user={{
        _id: userId,
        name: 'testUsername',
      }}
    />
  );
}
