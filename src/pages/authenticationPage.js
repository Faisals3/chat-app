import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Firebase from '../APIs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';

export default function renderAuthentication({ navigation }) {
  const [lang] = useState({
    en: {
      signup: 'Sign Up',
      signin: 'Sign In',
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [errorMessege, seterrorMessege] = useState('');
  const [errorMessageAuth, setErrorMessageAuth] = useState('');

  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [screen, setScreen] = useState('signIn');

  const handleMatchPass = () => {
    if (password !== confPassword) {
      seterrorMessege("Passwords doesn't match!");
    }
  };

  const createUser = async () => {
    //validation
    handleMatchPass();
    console.log(errorMessege);

    //firebsae and logs
    if (!errorMessege.length) {
      console.log('pressed!');
      const auth = Firebase.auth();
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Signed up succesfuly');
          signIn();
          setEmail('');
          setPassword('');
          setconfPassword('');
          seterrorMessege('');
          setErrorMessageAuth('');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessageAuth(error.message);
          console.log(errorMessage + ' - Error Code : ' + errorCode);
          // ..
        });
    }
  };

  const signIn = async () => {
    const auth = Firebase.auth();
    await auth
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

        navigation.navigate('TabNavigator');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessageAuth(error.message);
        console.log(errorMessage + ' - Error Code : ' + errorCode);
      });
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
        <View style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 3 }}>{signup}</Text>
          </View>
          <View>
            <TextInput
              value={email}
              onChangeText={(email) => {
                setEmail(email), setErrorMessageAuth('');
              }}
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>
          <View>
            <TextInput
              value={password}
              onChangeText={(password) => {
                setPassword(password), seterrorMessege('');
              }}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>
          <View>
            <TextInput
              value={confPassword}
              onChangeText={(confPassword) => {
                setconfPassword(confPassword), seterrorMessege('');
              }}
              style={styles.input}
              placeholder="Confirm Password"
            />
          </View>
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginBottom: 6 }}>
            {errorMessege}
          </Text>
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginBottom: 6 }}>
            {errorMessageAuth}
          </Text>

          <Button mode="contained" onPress={createUser} style={styles.button}>
            Sign up
          </Button>

          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Text>Have an account ?</Text>
            <TouchableOpacity onPress={handleSignPage}>
              <Text> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const rednerSignin = () => {
    const { signin } = lang.en;
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 3 }}>{signin}</Text>
          </View>
          <View>
            <TextInput
              value={email}
              onChangeText={(email) => {
                setEmail(email), setErrorMessageAuth('');
              }}
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>
          <View>
            <TextInput
              value={password}
              onChangeText={(password) => {
                setPassword(password), setErrorMessageAuth('');
              }}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>
          <Button mode="contained" onPress={signIn} style={styles.button}>
            Sign in
          </Button>

          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Text>don't Have an account ?</Text>
            <TouchableOpacity onPress={handleSignPage}>
              <Text> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (screen === 'signIn') {
    return rednerSignin();
  }
  return renderSignup();
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
    backgroundColor: '#56D3DC',
  },

  button: {
    backgroundColor: '#56D3DC',
  },

  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
  },

  accountPage: {},

  welcomeText: {
    fontSize: 20,
  },
});
