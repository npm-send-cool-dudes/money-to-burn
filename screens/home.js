import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../App';

// var user = db.auth().currentUser;

// if (user) {
//   // User is signed in.
//   console.log('logged', user);
// } else {
//   // No user is signed in.
// }

export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);
  // console.log('db', db.ref('/GamesList/clikBait'));

  function buttonPress() {
    setCount(count + 1);
    //update database
    db.database().ref('/GamesList/clikBait/').update({ 1: count });
  }
  console.log('home', db.auth().currentUser);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button onPress={buttonPress} title="push me" color="red" />
    </View>
  );
}
