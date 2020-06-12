import React, { useState, useEffect } from 'react';
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
  useEffect(() => db.database().ref('/GamesList/clikBait/').set({ 0: 0 }), []);

  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState();
  let uid;
  db.auth().onAuthStateChanged(function (user) {
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

  const listener = db.database().ref('/GamesList/clikBait/');
  listener.on('value', function (snap) {
    console.log('test', snap.val()[uid]);
    if (snap.val()[uid] >= 10) {
      console.log(uid, 'won!!!!');
      setWinner(uid);
    }
  });

  function buttonPress() {
    setCount(count + 1);
    //update database
    db.database()
      .ref('/GamesList/clikBait/')
      .update({ [uid]: count });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      {!winner && <Button onPress={buttonPress} title="push me" color="red" />}
      {winner && <Text>Winner is {winner}!!!!!!!!!!</Text>}
    </View>
  );
}
