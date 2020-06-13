import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../App';
import PlayerStatus from './utilities/playerStatus';
import { useObjectVal } from 'react-firebase-hooks/database';

// let uid;
// db.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     uid = user.uid;
//     console.log('user', uid);
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

export default function WaitingRoom({ navigation }) {
  let playerList = db.database().ref('/Rooms/ABCD/playerList/');
  const [value, loading, error] = useObjectVal(playerList);

  // useEffect(() => {}, [playerList]);
  console.log(value);

  const randoName = Math.floor(Math.random() * 10000);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(value)}</Text>
      {/* <PlayerStatus playerList={playerList} /> */}
    </View>
  );
}
