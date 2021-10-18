import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Firebase from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../redux/userSlice';
import RenderAuthentication from './authenticationPage';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [screen, setScreen] = useState('signIn');

  const createUser = async () => {
    console.log('pressed!');
    const auth = Firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signed up succesfuly');
        signIn();
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + ' - Error Code : ' + errorCode);
        // ..
      });
  };

  const signIn = async () => {
    const auth = Firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed ins

        console.log(
          'Signed in Succesfuly user ID : ' +
            userCredential.user.uid +
            ' email : ' +
            userCredential.user.email
        );

        dispatch(
          setUserAction({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + ' - Error Code : ' + errorCode);
      });
  };

  const Logout = () => {
    const empty = 'none';
    dispatch(
      setUserAction({
        uid: 'none',
        email: 'none',
      })
    );
    navigation.navigate('Authentication Page');
  };

  const handleSignPage = () => {
    if (screen == 'signIn') {
      setScreen('signUp');
    } else {
      setScreen('signIn');
    }
  };

  const renderSignup = () => {
    const { signup } = lang.en;

    return (
      <View style={{ justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 3 }}>{signup}</Text>
        </View>
        <View>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
            placeholder="Enter Email"
          />
        </View>
        <View>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
            placeholder="Enter Password"
          />
        </View>
        <Button mode="contained" onPress={createUser} style={styles.button}>
          Sign up
        </Button>

        <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{}}>
            Have an account ?
            <TouchableOpacity onPress={handleSignPage}>
              <Text style={{ marginTop: 0 }}> Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  };

  const rednerSignin = () => {
    const { signin } = lang.en;
    return (
      <View style={{ justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 3 }}>{signin}</Text>
        </View>
        <View>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
            placeholder="Enter Email"
          />
        </View>
        <View>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
            placeholder="Enter Password"
          />
        </View>
        <Button mode="contained" onPress={signIn} style={styles.button}>
          Sign in
        </Button>

        <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{}}>
            don't Have an account ?
            <TouchableOpacity onPress={handleSignPage}>
              <Text style={{ marginTop: 0 }}> Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  };

  const renderAuthentication = () => {
    if (screen === 'signIn') {
      return rednerSignin();
    }
    return renderSignup();
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

  return <View>{currentUser.email === 'none' ? <RenderAuthentication /> : renderAccount()}</View>;
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
