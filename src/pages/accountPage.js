import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Firebase from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../redux/userSlice';
import RenderAuthentication from './authenticationPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
export default function accountPage({ navigation }) {
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
      signin: 'Sign In',
      chatHeader: 'Chat',
      accountPageHeader: 'Account Page',
    },
  });

  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser.email === 'none') {
      navigation.navigate('Authentication Page');
    }
  }, []);

  const Logout = () => {
    dispatch(
      setUserAction({
        uid: 'none',
        email: 'none',
      })
    );
    navigation.navigate('Authentication Page');
  };

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content title={<Text style={style}> {title} </Text>} style={{ alignItems: 'center' }} />
  );
  const renderAccount = () => {
    return (
      <View>
        <View>
          <Appbar.Header style={styles.appHeader}>
            <ContentTitle title={lang.en.accountPageHeader} style={{ color: 'white' }} />
          </Appbar.Header>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome : {currentUser.email}</Text>
          <Button mode="contained" onPress={Logout} style={styles.logoutButton}>
            Logout!
          </Button>
        </View>
      </View>
    );
  };

  return <View>{renderAccount()}</View>;
}
const styles = StyleSheet.create({
  container: {
    margin: 30,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 240,
  },

  logoutButton: {
    marginTop: 100,
    backgroundColor: '#56D3DC',
  },

  button: {
    backgroundColor: '#56D3DC',
  },

  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
  },

  accountPage: {},

  welcomeText: {
    fontSize: 20,
  },
  appHeader: {
    backgroundColor: '#32292F',
  },
});
