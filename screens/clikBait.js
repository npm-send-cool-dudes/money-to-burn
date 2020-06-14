import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useListVals,
  useObjectVal,
  useList,
  useObject,
} from 'react-firebase-hooks/database';

let scoreDisplay = [[1, 1]];

export default function ClikBait({ navigation }) {
  const [user, loading, error] = useAuthState(db.auth());
  //TODO change this line once room DB hook for games is done
  let uid = user.uid;

  useEffect(() => {
    db.database()
      .ref('/GamesList/clikBait/')
      .update({ [uid]: 0 });
  }, []);

  const [allScores] = useObjectVal(db.database().ref(`/GamesList/clikBait/`));

  useEffect(() => {
    scoreDisplay = allScores ? Object.entries(allScores) : [];
  }, [allScores]);

  const [personalScore] = useObjectVal(
    db.database().ref(`/GamesList/clikBait/${uid}`)
  );

  function buttonPress() {
    //update database

    db.database()
      .ref(`/GamesList/clikBait/`)
      .update({ [uid]: personalScore + 1 });
  }
  /*need
  userNames
  currentScores
  targetScore (win condition)

*/
  console.log('scoredisplay', scoreDisplay);
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
      {scoreDisplay.map(([player, score]) => (
        <Text key={player}>
          {player} {score}
        </Text>
      ))}

      <Button onPress={buttonPress} title="push me" color="red" />

      <Text>Winner is!!!!!!!!!!</Text>
    </View>
  );
}
