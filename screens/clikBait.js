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
      {allScores &&
        Object.keys(allScores).map((userKey) => {
          if (userKey !== uid) {
            return (
              <Text key={userKey}>
                {userKey} Score: {allScores[userKey]}
              </Text>
            );
          }
        })}
      <Text>
        {uid}
        personal Score{personalScore}
      </Text>

      <Button onPress={buttonPress} title="push me" color="red" />

      <Text>Winner is!!!!!!!!!!</Text>
    </View>
  );
}
