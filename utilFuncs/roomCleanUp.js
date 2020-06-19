import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  useListVals,
  useObjectVal,
  useList,
  useObject,
} from 'react-firebase-hooks/database';

//function will have two parts; one is to remove single user from playerList, the other is to delete the room if the player is the last player

export default function roomCleanUp(
  navigation,
  roomName,
  uid,
  playerReference
) {
  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  playerList.update({
    [uid]: null,
  });

  // const [playerListTest, setPlayerListTest] = useList(playerList);
  console.log(playerReference);

  // db.database()
  //   .ref(`/Rooms/${roomName}/playerList`)
  //   .update({ [uid]: null });
  navigation.navigate('Home');
}
