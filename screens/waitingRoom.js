import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { db } from '../App';
import PlayerStatus from './utilities/playerStatus';
import { useObjectVal } from 'react-firebase-hooks/database';


function button(){
  db.database()
    .ref('/Rooms/ABCD/playerList/')
    .update({ '1': {status: 'waiting'} });
}


const QRcode = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  width: 200,
  height: 200,
};

export default function WaitingRoom({ navigation }) {

  let uid;
  db.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    console.log('user', uid);
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

  let playerList = db.database().ref('/Rooms/ABCD/playerList/');
  const [players, loading, error] = useObjectVal(playerList);
  const user = 1;
  useEffect(
  ()=> {uid && db.database()
  .ref(`/Rooms/ABCD/playerList/${user}`)
  .update({uid: uid});
  });

  players && players.splice(0,1);
  //const randoName = Math.floor(Math.random() * 10000);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {uid && <Text> {uid} </Text>}
      <Image source={QRcode} style={styles.logo} />
      <Text>ROOM ABCD</Text>
      {loading && <Text> loading players... </Text>}
      {players && players.map(player=> <PlayerStatus key={player.uid} name={player.uid} status={player.status} />)}
      <Button
        title="update status"
        onPress={button}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
