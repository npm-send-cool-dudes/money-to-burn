import React, { useEffect } from 'react';
import { db } from '../../firebaseConfig';
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
  let rooms = db.database().ref(`/Rooms/`);

  playerList.update({
    [uid]: null,
  });

  if (playerReference.length <= 1) {
    rooms.update({
      [roomName]: null,
    });
  }

  // const [playerListTest, setPlayerListTest] = useList(playerList);

  // db.database()
  //   .ref(`/Rooms/${roomName}/playerList`)
  //   .update({ [uid]: null });
  navigation.navigate('Home');
}
