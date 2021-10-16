import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../redux/chatSlice';

export default function Chats({ navigation }) {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    {
      id: '11111 ',
      title: 'New group',
    },
    {
      id: '503503 ',
      title: 'Free of bugs!! ... hopefuly :(',
    },
    {
      id: '777777 ',
      title: 'Testing date format!',
    },
  ];

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content title={<Text style={style}> {title} </Text>} style={{ alignItems: 'center' }} />
  );

  return (
    <View>
      <Appbar.Header style={styles.appHeader}>
        <ContentTitle title={'Chats'} style={{ color: 'white' }} />
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
