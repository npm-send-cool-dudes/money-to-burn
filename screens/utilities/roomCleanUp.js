import React, { useEffect } from 'react';
import { db } from '../../firebaseConfig';
import {
  useListVals,
  useObjectVal,
  useList,
  useObject,
} from 'react-firebase-hooks/database';
import { stopClock } from 'react-native-reanimated';

//function will have two parts; one is to remove single user from playerList, the other is to delete the room if the player is the last player

export default function roomCleanUp(
  navigation,
  roomName,
  uid,
  playerReference,
  winner
) {
  async function betResolution(roomName, uid) {
    const userDbRef = db.database().ref(`/Users/${uid}/`);
    let userVals, stacksLost;
    let bettingRoom;

    try {
      await db
        .database()
        .ref(`/Rooms/${roomName}/Bets`)
        .once('value', (e) => console.log(e.val()))
        .then((ret) => (bettingRoom = ret.val()));
      await db
        .database()
        .ref(`/Users/${uid}/`)
        .once('value', (user) => console.log(user))
        .then((ret) => (userVals = ret.val()));

      stacksLost = userVals.stacks - bettingRoom[uid];
    } catch (error) {
      console.log(error);
    }

    // console.log(stacksLost);
    // console.log('bettingroom', bettingRoom);
    // console.log('userVals', userVals);

    // console.log(bettingRoom.val()[uid]);
    userDbRef.update({ stacks: stacksLost });
  }
  async function betPayout(roomName, winner) {
    const winnerDbRef = db.database().ref(`/Users/${winner}/`);

    let userVals;
    let betTotal;
    try {
      await db
        .database()
        .ref(`/Users/${uid}/`)
        .once('value', (user) => console.log(user))
        .then((ret) => (userVals = ret.val()));

      await db
        .database()
        .ref(`/Rooms/${roomName}/Bets`)
        .once('value', (e) => console.log(e.val()))
        .then((ret) => (betTotal = ret.val()));

      let betArray = Object.values(betTotal);

      let stacksWon = 0;

      betArray.forEach((bet) => (stacksWon += bet));

      let winnerStacks = stacksWon + userVals.stacks;

      winnerDbRef.update({ stacks: winnerStacks });
    } catch (err) {
      console.log(err);
    }
  }

  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  let rooms = db.database().ref(`/Rooms/`);
  betResolution(roomName, uid);

  betPayout(roomName, winner);

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
