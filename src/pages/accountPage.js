import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Firebase from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
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
        // Signed ins

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
      <View style={{ justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 3 }}>{signup}</Text>
        </View>
        <View>
          <TextInput value={email} onChangeText={(email) => setEmail(email)} style={styles.input} />
        </View>
        <View>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
        </View>
        <Button mode="contained" onPress={createUser}>
          Sign up
        </Button>

        <View style={{ marginTop: 30 }}>
          <Text>
            Have an account ?
            <TouchableOpacity onPress={handleSignPage}>
              <Text> Sign in</Text>
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
          <TextInput value={email} onChangeText={(email) => setEmail(email)} style={styles.input} />
        </View>
        <View>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
        </View>
        <Button mode="contained" onPress={signIn}>
          Sign in
        </Button>

        <View style={{ marginTop: 30 }}>
          <Text style={{ marginTop: 0 }}>
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
    return <View>{screen === 'signIn' ? rednerSignin() : renderSignup()}</View>;
  };

  const renderAccount = () => {
    return (
      <View>
        <Text style={styles.welcomeText}>Welcome : {currentUser.email}</Text>
        <Button mode="contained" onPress={Logout} style={styles.logoutButton}>
          Logout!
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentUser.email === 'none' ? renderAuthentication() : renderAccount()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 30,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 300,
  },

  logoutButton: {
    marginTop: 100,
  },

  input: {
    margin: 12,
  },

  accountPage: {},

  welcomeText: {
    fontSize: 20,
  },
});
