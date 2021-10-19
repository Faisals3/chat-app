import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { List, Appbar, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../redux/chatSlice';
import { dbRoot } from '../APIs/firebase';

export default function Chats({ navigation }) {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userGroupsList, setUserGroupsList] = useState([]);
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
      signin: 'Sign In',
      chatHeader: 'Chat',
      accountPageHeader: 'Account Page',
    },
  });

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

  useEffect(() => {
    getGroupsFromFireBase();
  }, []);

  const getGroupsFromFireBase = () => {
    let userGroups = [];
    dbRoot.collection('group_chats').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().users.includes(currentUser.uid)) {
          userGroups.push(doc.data());
        }
      });
      setUserGroupsList(userGroups);
      userGroups = [];

      console.log(userGroupsList);
    });
  };

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content title={<Text style={style}> {title} </Text>} style={{ alignItems: 'center' }} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.appHeader}>
        <ContentTitle title={lang.en.chatHeader} style={{ color: 'white' }} />
      </Appbar.Header>
      <View>
        {userGroupsList.map((chat) => (
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
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('New Chat Page')}
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

  chatButton: {},

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
