import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

import Home from './screens/home';
import Login from './screens/login';
import GameSelector from './screens/gameSelector';
import ClikBait from './screens/clikBait';

const Stack = createStackNavigator();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

import { useObjectVal } from 'react-firebase-hooks/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDfYmbv82EH6KCzzwOhT3DK_7ufoXfWbXU',
  authDomain: 'money-to-burn---ron-db.firebaseapp.com',
  databaseURL: 'https://money-to-burn---ron-db.firebaseio.com',
  projectId: 'money-to-burn---ron-db',
  storageBucket: 'money-to-burn---ron-db.appspot.com',
  messagingSenderId: '508239108257',
  appId: '1:508239108257:web:13cf7398e1fe29a26cb8e0',
  measurementId: 'G-V8FFSPWNVY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ref = firebase.database().ref();

export const db = firebase;

firebase
  .auth()
  .signInAnonymously()
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

let uid;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    console.log('user', uid);
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

export default function App() {
  // const [value, loading, error] = useObjectVal(ref);
  const [count, setCount] = useState(0);

  async function buttonPress() {
    await setCount(count + 1);
    //update database
    var countfire = firebase.database().ref();
    countfire.update({ thisisavalue: count });
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameSelector" component={GameSelector} />
          <Stack.Screen name="ClikBait" component={ClikBait} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
