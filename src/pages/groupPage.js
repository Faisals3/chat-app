import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';

export default function groupChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const activeChat = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user);
  const [testMessages, setTestMessages] = useState([]);
  const [uploadedMessages, setUploadMessages] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getMessagesFromFireStore();
  }, []);

  async function getMessagesFromFireStore() {
    console.log('====== I AM TRIGGREDD!! ======');

    let array = [];
    await dbRoot
      .collection('group_chats')
      .doc(activeChat.activeChatID)
      .collection('messages')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const updatedDoc = doc.data();
          updatedDoc.createdAt = updatedDoc.createdAt.toDate();
          array.push(updatedDoc);
        });
        array.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(array);
        array = [];
      });
  }

  async function onSend(messagesToSend = []) {
    console.log(messagesToSend[0]);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messagesToSend));

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

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{ alignItems: 'center', marginRight: 40 }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Appbar.Header style={styles.appHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <ContentTitle title={activeChat.activeChatTitle} style={{ color: 'white' }} />
        </Appbar.Header>
        <GiftedChat
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
          }}
          renderUsernameOnMessage={true}
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
            avatar: null,
            name: currentUser.email,
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
