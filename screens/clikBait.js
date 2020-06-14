import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
let gameWon = false;

export default function ClikBait({ navigation }) {
  const [user, loading, error] = useAuthState(db.auth());
  //TODO change this line once room DB hook for games is done

  useEffect(() => {
    db.database().ref('/GamesList/clikBait/').set({ 0: 0 });
    console.log('useEffect renders!');
  }, []);

  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState();
  let uid = user.uid;
  //listen for whole player object
  const listener = db.database().ref('/GamesList/clikBait/');
  listener.on('value', function (snap) {
    //map over all users to pull scores
    if (snap.val()[uid] == 10 && gameWon == false) {
      console.log(uid, 'won!!!!');
      gameWon = true;
      setWinner(uid);
    }
  });
  const clikBaitPlayers = db.database().ref(`/GamesList/clikBait/`);
  const [players] = useObjectVal(clikBaitPlayers);
  console.log(players);
  // players.forEach((player) => {
  //   console.log(player);
  // });

  function buttonPress() {
    //update database
    setCount(count + 1);
    db.database()
      .ref('/GamesList/clikBait/')
      .update({ [uid]: count });
  }
  /*need
  userNames
  currentScores
  targetScore (win condition)

*/
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{}}>
        {'player1'}
        {'player1'}
        {'player1'}
        {'player1'}
      </Text>
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
