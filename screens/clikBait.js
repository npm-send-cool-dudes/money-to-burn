import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useListVals,
  useObjectVal,
  useList,
  useObject,
} from 'react-firebase-hooks/database';


let winner = false;

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


  //TODO look into refactoring, maybe remove useEffect
  //TODO clean up game object when done
  useEffect(() => {
    allScores &&
      Object.keys(allScores).map((userKey) => {
        if (allScores[userKey] >= 9) {
          winner = userKey;
        }
      });

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

      {!winner && (
        <View>
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
          <Text>Personal Score: {personalScore}</Text>


          <Button onPress={buttonPress} title="push me" color="red" />
        </View>
      )}
      {winner && (
        <View>
          <Text>Winner is {winner}</Text>
          <Button title="Go Home" onPress={() => navigation.navigate('Home')}>
            GO HOME!
          </Button>
        </View>
      )}
    </View>
  );
}
