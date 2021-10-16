import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { List, Appbar } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';

export default function groupChat() {
  const [messages, setMessages] = useState([]);
  const activeChat = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user);
  const [test, setTest] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function recieveMessagesFromFireStore() {
    try {
      await dbRoot
        .collection('group_chats')
        .doc(activeChat.activeChatID)
        .collection('messages')
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function onSend(messagesToSend = []) {
    console.log(messagesToSend[0]);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messagesToSend));
    recieveMessagesFromFireStore();
    console.log(test);

    await dbRoot
      .collection('group_chats')
      .doc(activeChat.activeChatID)
      .collection('messages')
      .doc(messagesToSend[0]._id)
      .set(messagesToSend[0])
      .then(() => {
        console.log('message sent succesfuly');
      })
      .catch(() => {
        console.log('sent message failed');
      });
  }

  const image = {
    uri: 'https://cdn.statically.io/img/wallpapercave.com/wp/wp3998752.jpg',
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Appbar.Header style={styles.appHeader}>
          <Appbar.Content title={activeChat.activeChatTitle} />
        </Appbar.Header>
        <GiftedChat
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
          }}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                    color: '#24204F',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#E6F5F3',
                  },
                  right: {
                    backgroundColor: '#197278',
                  },
                }}
              />
            );
          }}
          user={{
            _id: currentUser.uid,
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#32292F',
    justifyContent: 'center',
  },
  chatBar: {
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },

  chatButton: {},

  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
