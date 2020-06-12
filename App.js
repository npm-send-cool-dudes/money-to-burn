import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Homepage from './components/homepage';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

import { useObjectVal } from 'react-firebase-hooks/database';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzCCPQjPzALATf_YOCXSpporWLGPX6OgA',
  authDomain: 'money-to-burn.firebaseapp.com',
  databaseURL: 'https://money-to-burn.firebaseio.com',
  projectId: 'money-to-burn',
  storageBucket: 'money-to-burn.appspot.com',
  messagingSenderId: '259957476230',
  appId: '1:259957476230:web:f7e68b8436ffd6bcbbba07',
  measurementId: 'G-2JNBJLSCLD',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ref = firebase.database().ref();

export default function App() {
  const [value, loading, error] = useObjectVal(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    var countfire = firebase.database().ref();
    countfire.update({ thisisavalue: 'boobies' });
  }, []);

  async function buttonPress() {
    await setCount(count + 1);
    //update database
    var countfire = firebase.database().ref();
    countfire.update({ thisisavalue: count });
  }

  return (
    <Homepage />
    // <View style={styles.container}>
    //   {loading && <Text>Loading</Text>}
    //   {value && <Text>{JSON.stringify(value) + count}</Text>}
    //   {/* for not existing */}
    //   {value === null && <Text>DNE</Text>}
    //   {error && <Text>error</Text>}
    //   <Button onPress={buttonPress} title="push me" color="red" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
