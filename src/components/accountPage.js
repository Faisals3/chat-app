import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Button, List } from 'react-native-paper';
import * as Application from 'expo-application';
import Firebase from './firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';
export default function accountPage() {
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
      signin: 'Sign In',
    },
  });
  const [email, setEmail] = useState('test2@gmail.com');
  const [password, setPassword] = useState('123123');

  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [screen, setScreen] = useState('signIn');

  const createUser = () => {
    console.log('pressed!');
    const auth = Firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signed up succesfuly');
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

  const signIn = () => {
    const auth = Firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in

        console.log(
          'Signed in Succesfuly user ID : ' +
            userCredential.user.uid +
            ' email : ' +
            userCredential.user.email
        );

        dispatch(
          setUser({
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
      setUser({
        uid: 'none',
        email: 'none',
      })
    );
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
      <View style={styles.container}>
        <Text>{signup}</Text>
        <TextInput value={email} onChangeText={(email) => setEmail(email)} style={styles.input} />

        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
        />

        <Button mode="contained" onPress={createUser}>
          Sign up
        </Button>

        <View>
          <Text>Have an account ? </Text>
          <TouchableOpacity onPress={handleSignPage}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const rednerSignin = () => {
    const { signin } = lang.en;
    return (
      <View>
        <Text>{signin}</Text>
        <View>
          <TextInput value={email} onChangeText={(email) => setEmail(email)} />
        </View>
        <View>
          <TextInput value={password} onChangeText={(password) => setPassword(password)} />
        </View>
        <Button mode="contained" onPress={signIn}>
          Sign in
        </Button>

        <View>
          <Text>
            {JSON.stringify(currentUser.email)}
            don't Have an account ?
            <TouchableOpacity onPress={handleSignPage}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  };

  const renderAuthentication = () => {
    return <View>{screen === 'signIn' ? rednerSignin() : renderSignup()}</View>;
  };

  const renderAccount = () => {
    return (
      <View>
        <Text>Active user : {currentUser.email}</Text>
        <Button mode="contained" onPress={Logout}>
          Logout!
        </Button>
      </View>
    );
  };

  return <View>{currentUser.email === 'none' ? renderAuthentication() : renderAccount()}</View>;
}
const styles = StyleSheet.create({
  container: {},

  input: {
    margin: 12,
  },
});
