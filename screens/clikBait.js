import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useListVals,
  useObjectVal,
  useList,
} from 'react-firebase-hooks/database';

export default function ClikBait({ navigation }) {
  const [user, loading, error] = useAuthState(db.auth());
  //TODO change this line once room DB hook for games is done

  useEffect(() => {
    db.database().ref('/GamesList/clikBait/').set({ winner: '' });
    // console.log('useEffect renders!');
  }, []);

  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState();
  let uid = user.uid;
  //listen for whole player object
  const listener = db.database().ref('/GamesList/clikBait/');

  listener.on('value', function (snap) {
    //map over all users to pull scores
    if (snap.val()[uid] == 10 && clikBaitPlayers.winner) {
      console.log(uid, 'won!!!!');

      db.database().ref('/GamesList/clikBait/').update({ winner: uid });
    }
  });
  const clikBaitPlayers = db.database().ref(`/GamesList/clikBait/`);
  const [players] = useObjectVal(clikBaitPlayers);
  // useEffect(() => {
  //   Object.values(players);
  // }, [players]);

  console.log(players);
  const [currentPlayers] = useList(clikBaitPlayers);
  const activePlayers = currentPlayers.filter((single) => {
    // console.log('single', single);
    return single != 'winner';
  });
  // console.log('active players', activePlayers);

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
      {/* {Object.keys(clikBaitPlayer).map((key) =>
        key !== 'winner' ? key[uid] : null
      )} */}
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Text>{count}</Text>
      {!clikBaitPlayers.winner && (
        <Button onPress={buttonPress} title="push me" color="red" />
      )}
      {clikBaitPlayers.winner && (
        <Text>Winner is {clikBaitPlayers.winner}!!!!!!!!!!</Text>
      )}
    </View>
  );
}
