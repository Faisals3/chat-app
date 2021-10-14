import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';
import { useSelector } from 'react-redux';

export default function Chats() {
  const currentUser = useSelector((state) => state.user);

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

  return (
    <View>
      <Appbar.Header style={styles.appHeader}>
        <Appbar.Content title="Chats" />
      </Appbar.Header>

      <List.Item
        title="Group 1"
        description="ID : 001"
        left={(props) => <List.Icon {...props} icon="chat" />}
        style={styles.chatBar}
      />
      <List.Item
        title="Group 2"
        description="Id : 002"
        left={(props) => <List.Icon {...props} icon="chat" />}
        style={styles.chatBar}
      />
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
});
