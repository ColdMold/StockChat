import {firebase} from '@react-native-firebase/auth';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

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
    console.log('getting user id in ChatRoom from: ' + 'firebase.auth()');
    return firebase.auth().currentUser.getIdToken();
  };

  useEffect(() => {
    // here, we will pull previous messages using setMessages. For now,
    // go with default implementation
    // NOTE: This will call set messages each time we leave the screen
    // Might be useful to store messages in global state at some point
    if (messages.length < 1) {
      setMessages([
        {
          _id: 1,
          text: `Welcome to the ${companySymbol} Chat Room!`,
          createdAt: new Date(),
          user: {
            _id: 0,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]);
    } else {
      // Set Messages from Firebase
    }

    fetchUserId(getUserId());
  }, [companySymbol]);

  // This is what is used when send is pressed. We will have to
  // on successful send, upload the message to the database
  const onSend = useCallback((message = []) => {
    // it appears only one message is sent at a time, so we access using messages[0]
    console.log(message[0].user._id);
    console.log(message);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => onSend(message)}
      user={{
        _id: userId,
      }}
    />
  );
}
