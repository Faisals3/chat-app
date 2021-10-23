import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { GiftedChat, Bubble, Actions } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { dbRoot } from '../APIs/firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { uuid } from '../utils/uuidv4.js';

export default function groupChat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [imageuri, setImageuri] = useState('');
  const activeChat = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user);

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
        setImageuri('');
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

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ['Document']: async (props) => {
            try {
              let result = await DocumentPicker.getDocumentAsync({});
              console.log(result);
            } catch (e) {
              throw e;
            }
          },
          ['Photos']: async (props) => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            console.log(result);

            //send image unique id to group chat

            if (!result.cancelled) {
              let photoID = uuid();
              uploadImage(result.uri, photoID)
                .then(() => {
                  console.log('Image sent succesfuly');
                  var storageRef = firebase.storage().ref();
                  storageRef
                    .child('images/' + photoID)
                    .getDownloadURL()
                    .then((url) => {
                      setImageuri(url);
                      console.log(url);
                      onSend({
                        _id: photoID,
                        createdAt: new Date(),
                        image: imageuri,
                        user: {
                          _id: currentUser.uid,
                          avatar: null,
                          name: currentUser.email,
                        },
                      });
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          },
          Cancel: (props) => {
            console.log('Cancel');
          },
        }}
        onSend={(args) => console.log(args)}
      />
    );
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + imageName);

    return ref.put(blob);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            renderActions={() => renderActions()}
            user={{
              _id: currentUser.uid,
              avatar: null,
              name: currentUser.email,
            }}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
