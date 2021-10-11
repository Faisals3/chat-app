import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Firebase from './firebase';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
    },
  });
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
        setUser(userCredential.user.email);
        console.log('Signed in Succesfuly user : ' + userCredential.user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + ' - Error Code : ' + errorCode);
      });
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
      </View>
    );
  };

  return (
    <View>
      {renderSignup()}
      <Text>Sign in</Text>

      <TextInput value={email} onChangeText={(email) => setEmail(email)} style={styles.input} />

      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />

      <Button mode="contained" onPress={signIn}>
        Sign in
      </Button>

      <Text>Active user is : {user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    margin: 20,
  },

  input: {
    margin: 12,
  },
});
