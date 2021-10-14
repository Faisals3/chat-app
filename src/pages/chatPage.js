import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../redux/chatSlice';

export default function Chats({ navigation }) {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addMessage = () => {
    var massegeRan = Math.random().toString();
    dbRoot
      .collection('group_chats')
      .doc('001')
      .collection('messages')
      .doc(massegeRan)
      .set({ massege: massegeRan, sender: currentUser.uid })
      .then(() => {
        console.log('message sent succesfuly');
      })
      .catch(() => {
        console.log('sent message failed');
      });
  };

  function onPressChat(chat) {
    navigation.navigate('Group Page');

    // set group data in state (redux and gets data from database)

    dispatch(
      setActiveChat({
        id: chat.id,
        title: chat.title,
      })
    );
  }

  const chats = [
    {
      id: '62546',
      title: 'Good group',
    },
    {
      id: '27603 ',
      title: 'Bad group',
    },
  ];

  return (
    <View>
      <Appbar.Header style={styles.appHeader}>
        <Appbar.Content title="Chats" />
      </Appbar.Header>
      <View>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatButton}
            onPress={() => onPressChat(chat)}
          >
            <List.Item
              title={chat.title}
              description={chat.id}
              left={(props) => <List.Icon {...props} icon="chat" />}
              style={styles.chatBar}
            />
          </TouchableOpacity>
        ))}
      </View>
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
});
