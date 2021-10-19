import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { uuid8D } from '../utils/uuid8D';

export default function newChatPage({ navigation }) {
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
      signin: 'Sign In',
      chatHeader: 'Chat',
      accountPageHeader: 'Account Page',
      newChat: 'New Chat',
    },
  });

  const currentUser = useSelector((state) => state.user);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [screen, setScreen] = useState('create');
  const [errorMessege, seterrorMessege] = useState('');

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{ alignItems: 'center', marginRight: 50 }}
    />
  );

  const joinGroup = async () => {
    console.log('=======  Start checking  =======');

    //join group validation
    const groupDetails = dbRoot.collection('group_chats').doc(id);
    const doc = await groupDetails.get();
    if (!doc.exists) {
      seterrorMessege("Group doesn't exist");
    } else {
      if (doc.data().users.includes(currentUser.uid)) {
        seterrorMessege('User already in this group!!!');
      } else {
        let groupData = doc.data();
        groupData.users.push(currentUser.uid);
        //Add user to the group users array
        dbRoot
          .collection('group_chats')
          .doc(id)
          .set(groupData)
          .then(() => {
            console.log('User Joined Group Succesfuly');
          })
          .catch(() => {
            console.log('User Joined Group [failed]');
          });

        navigation.navigate('TabNavigator');
      }
    }

    console.log('=====  done from checking  =====');
  };

  const createGroup = async () => {
    let newUsersArray = [currentUser.uid];
    const groupId = uuid8D();

    const newGroup = {
      title,
      users: newUsersArray,
      id: groupId,
    };

    //Create group validation
    const groupDetails = dbRoot.collection('group_chats').doc(groupId);
    const doc = await groupDetails.get();
    if (!doc.exists) {
      //group should be created
      dbRoot
        .collection('group_chats')
        .doc(groupId)
        .set(newGroup)
        .then(() => {
          console.log('group created succesfuly');
          navigation.navigate('TabNavigator');
        })
        .catch(() => {
          console.log('group created failed');
        });
    } else {
      seterrorMessege('Group Creattion failed. Please try again later');
    }
  };

  const renderJoinGroup = () => {
    return (
      <View>
        <Appbar.Header style={styles.appHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <ContentTitle title={lang.en.newChat} style={{ color: 'white' }} />
        </Appbar.Header>
        <View style={styles.container}>
          <TextInput
            value={id}
            onChangeText={(id) => {
              setId(id), seterrorMessege('');
            }}
            style={styles.input}
            placeholder="Enter Group ID"
          />

          <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginBottom: 6 }}>
            {errorMessege}
          </Text>

          <Button mode="contained" style={styles.Button} onPress={joinGroup}>
            Join Group
          </Button>

          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Text>Don't have an existing group ? </Text>
            <TouchableOpacity onPress={() => setScreen('create')}>
              <Text> Create one! </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderCreateGroup = () => {
    return (
      <View>
        <Appbar.Header style={styles.appHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <ContentTitle title={lang.en.newChat} style={{ color: 'white' }} />
        </Appbar.Header>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={styles.input}
            placeholder="Enter Group Title"
          />
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginBottom: 6 }}>
            {errorMessege}
          </Text>
          <Button mode="contained" onPress={createGroup} style={styles.Button}>
            Create Group
          </Button>

          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Text>Have group already ? </Text>
            <TouchableOpacity onPress={() => setScreen('join')}>
              <Text> Join! </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (screen === 'create') {
    return renderCreateGroup();
  }
  return renderJoinGroup();
}

const styles = StyleSheet.create({
  Button: {
    marginTop: 60,
    backgroundColor: '#56D3DC',
  },
  container: {
    margin: 30,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 240,
  },
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
    bottom: -250,
  },

  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
  },
});
