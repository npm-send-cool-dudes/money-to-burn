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
  let uid = user.uid;

  useEffect(() => {
    db.database()
      .ref('/GamesList/clikBait/')
      .set({ [uid]: 0 });
  }, []);

  const [allScores] = useListVals(db.database().ref(`/GamesList/clikBait/`));

  console.log('all', allScores);

  const [personalScore] = useObjectVal(
    db.database().ref(`/GamesList/clikBait/${uid}`)
  );

  console.log('personalScore', personalScore);

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
      <Text>
        {uid}
        personal Score{personalScore}
      </Text>
      {!clikBaitPlayers.winner && (
        <Button onPress={buttonPress} title="push me" color="red" />
      )}
      {clikBaitPlayers.winner && (
        <Text>Winner is {clikBaitPlayers.winner}!!!!!!!!!!</Text>
      )}
    </View>
  );
}
