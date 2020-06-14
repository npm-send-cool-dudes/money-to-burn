import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ClikBait({ navigation }) {
  const [user, loading, error] = useAuthState(db.auth());

  useEffect(() => db.database().ref('/GamesList/clikBait/').set({ 0: 0 }), []);

  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState();
  let uid = user.uid;

  const listener = db.database().ref('/GamesList/clikBait/');
  listener.on('value', function (snap) {
    if (snap.val()[uid] >= 10) {
      console.log(uid, 'won!!!!');
      setWinner(uid);
    }
  });

  function buttonPress() {
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
      <Text>{count}</Text>
      {!winner && <Button onPress={buttonPress} title="push me" color="red" />}
      {winner && <Text>Winner is {winner}!!!!!!!!!!</Text>}
    </View>
  );
}
