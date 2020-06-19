import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import roomCleanUp from '../utilFuncs/roomCleanUp';
import {
  useListVals,
  useObjectVal,
  useList,
  useObject,
} from 'react-firebase-hooks/database';

export default function ClikBait(props) {
  const [winner, setWinner] = useState();

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
        if (allScores[userKey] >= 10) {
          setWinner(userKey);
        }
      });
  }, [allScores]);

  const [personalScore] = useObjectVal(
    db.database().ref(`/GamesList/clikBait/${uid}`)
  );

  function buttonPress() {
    //update database
    // db.database()
    //   .ref(`/GamesList/clikBait/`)
    //   .update({ [uid]: personalScore + 1 });
    const currentScoreRef = db.database().ref(`/GamesList/clikBait/${uid}`);
    currentScoreRef.transaction((currentScore = 0) => {
      return currentScore + 1;
    });
  }
  /*need
  userNames
  currentScores
  targetScore (win condition)

*/
  let playerList = db
    .database()
    .ref(`/Rooms/${props.route.params.roomName}/playerList/`);
  let rooms = db.database().ref(`/Rooms/`);
  const [playerListTest] = useListVals(playerList);

  function roomCleanUpTest(navigation, roomName, uid, playerReference) {
    playerList.update({
      [uid]: null,
    });
    if (playerListTest.length === 1) {
      rooms.update({
        [roomName]: null,
      });
    }
    console.log(playerListTest);

    // db.database()
    //   .ref(`/Rooms/${roomName}/playerList`)
    //   .update({ [uid]: null });
    navigation.navigate('Home');
  }

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
          <Button
            title="Go Home"
            onPress={() =>
              roomCleanUp(
                props.navigation,
                props.route.params.roomName,
                uid,
                playerListTest
              )
            }
          >
            GO HOME!
          </Button>
        </View>
      )}
    </View>
  );
}
