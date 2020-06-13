import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { db } from '../App';
import PlayerStatus from './utilities/playerStatus';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

function button(roomName) {
  db.database()
    .ref(`/Rooms/${roomName}/playerList/`)
    .update({ '1': { status: 'waiting' } });
}

const QRcode = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  width: 200,
  height: 200,
};

export default function WaitingRoom(props) {
  console.log(props);
  let navigation = props.navigation;
  let roomName = props.route.params.name;

  const [user, loading, error] = useAuthState(db.auth());
  let uid = user.uid;

  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  const [players] = useListVals(playerList);

  useEffect(() => {
    db.database()
      .ref(`/Rooms/${roomName}/playerList/${uid}`)
      .update({ uid: uid, status: 'waiting' });
  });

  console.log('players untouched', players);
  console.log('players values', players && Object.values(players));
  // console.log('keys', players && Object.keys(players));
  //const randoName = Math.floor(Math.random() * 10000);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {uid && <Text> {uid} </Text>}
      <Image source={QRcode} style={styles.logo} />
      <Text>ROOM ${roomName}</Text>
      {loading && <Text> loading players... </Text>}
      {players &&
        players.map((player) => (
          <PlayerStatus
            key={player.uid}
            name={player.uid}
            status={player.status}
          />
        ))}
      <Button title="update status" onPress={() => button(roomName)} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
