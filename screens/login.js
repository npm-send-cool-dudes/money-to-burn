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

import { db } from '../firebaseConfig';

export default function Login() {
  const { setLogIn } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await db
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
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
          <Button onPress={onSignUp} title="Sign Up"></Button>
        </View>
      )}
    </View>
  );
}
