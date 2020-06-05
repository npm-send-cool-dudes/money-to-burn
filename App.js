import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

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

var database = firebase.database();

export default function App() {
  var ref = firebase.database().ref();

  ref.on(
    'value',
    function (snapshot) {
      console.log(snapshot.val());
    },
    function (error) {
      console.log('Error: ' + error.code);
    }
  );

  return (
    <View style={styles.container}>
      <Text>npm send cool dudes!!</Text>
    </View>
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
