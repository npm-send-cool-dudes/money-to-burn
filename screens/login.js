import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import random_name from 'node-random-name';
import { db } from '../firebaseConfig';
import { set } from 'react-native-reanimated';
import { useAuthState } from 'react-firebase-hooks/auth';
import PlayerStatus from './utilities/playerStatus';

export default function Login() {
  //storing login status in usercontext, basically a stripped down redux
  const { setLogIn } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //validation logic and creating db object to be modified
  const onSignUp = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await db
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          const user = await db
            .database()
            .ref('Users/')
            .child(response.user.uid)
            .set({
              displayName: random_name({ seed: response.user.uid }),
              email: response.user.email,
              stacks: 1000,
            });

          setLoading(false);

          //add navigation here
          onSignIn(email, password);
        }
      } catch (error) {
        setLoading(false);
        if (error.code == 'auth/email-already-in-use') {
          alert('User already exists!');
        }
      }
    } else {
      alert('Please enter email and password');
    }
  };
  const onSignIn = async () => {
    setLoading(true);
    if (email && password) {
      try {
        const response = await db
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          db;
          setLoading(false);

          setLogIn();
        }
      } catch (error) {
        setLoading(false);
        switch (error.code) {
          case 'auth/user-not-found':
            alert('No users found with that email address');
            break;
          case 'auth/invalid-email':
            alert('Please enter an email address');
            break;
          default:
            break;
        }
      }
    } else {
      alert('Please enter email and password');
    }
  };

  const noAuthSignIn = async () => {
    setLoading(true);
    try {
      const response = await db.auth().signInAnonymously();
      if (response) {
        console.log(response);
        let dbVal =
          response &&
          (await db
            .database()
            .ref('Users/')
            .child(response.user.uid)
            .set({
              displayName: random_name({ seed: response.user.uid }),
              stacks: 1000,
            }));
        response.user.updateProfile({
          displayName: random_name({ seed: response.user.uid }),
        });
        // console.log(user);
        setLoading(false);
        setLogIn();
      }
    } catch (error) {
      console.log('error code', error.code);
      console.log('error message', error.message);
    }
  };

  //when loading, show a spinner (Activity indicator) otherwise continue
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              elevation: 1000,
            },
          ]}
        >
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      ) : (
        <View>
          <Text>Login</Text>
          <TextInput
            placeholder="email@email.com"
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
          <TextInput
            placeholder="enter password"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
          <Button onPress={onSignIn} title="Login"></Button>
          {/* <Button onPress={googleSignIn} title="Sign in with Google"></Button> */}
          <Button onPress={onSignUp} title="Sign Up"></Button>
          <Button onPress={noAuthSignIn} title="Anonymous sign in"></Button>
        </View>
      )}
    </View>
  );
}
