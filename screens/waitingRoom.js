import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { db } from '../firebaseConfig';
import PlayerStatus from './utilities/playerStatus';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

const QRcode = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  width: 200,
  height: 200,
};

export default function WaitingRoom(props) {
  const [user, loading, error] = useAuthState(db.auth());

  let uid = user.uid;
  let navigation = props.navigation;
  let roomName = props.route.params.roomName;
  let { gameName } = props.route.params;
  console.log('waiting room', props);
  console.log('gameName is', gameName);
  console.log('roomName is ', roomName);

  let playerStatus = db
    .database()
    .ref(`/Rooms/${roomName}/playerList/${uid}/status`);

  const [status] = useObjectVal(playerStatus);

  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  const [players] = useListVals(playerList);
  //removed useeffect and put in firebase hook
  const ready = players
    .map((player) => {
      return player.status;
    })
    .includes(true);

  useEffect(() => {
    uid &&
      db
        .database()
        .ref(`/Rooms/${roomName}/playerList/${uid}`)
        .update({ uid: uid, status: false });
  }, [uid]);

  function playerReady() {
    db.database()
      .ref(`/Rooms/${roomName}/playerList/${uid}/`)
      .update({ status: !status });
  }

  const navToGame = () => {
    db.database().ref(`/Rooms/${roomName}/`).update({ status: true });
    navigation.navigate(gameName);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {uid && <Text> {uid} </Text>}
      {ready && <Button onPress={navToGame} title="READY!!!!!!!!!!!!!!!" />}
      <Image source={QRcode} style={styles.logo} />
      <Text>ROOM ${roomName}</Text>
      {loading && <Text> loading players... </Text>}
      {players &&
        players.map((player) => (
          <PlayerStatus
            key={player.uid}
            name={player.uid}
            status={player.status ? 'Ready' : 'Waiting'}
          />
        ))}

      <Button title="Ready!" onPress={() => playerReady(roomName, uid)} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
