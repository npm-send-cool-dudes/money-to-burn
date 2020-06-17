import React, { useState, useEffect } from 'react';
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
  let roomName = props.route.params.name;
  let { gameName } = props;

  let playerStatus = db
    .database()
    .ref(`/Rooms/${roomName}/playerList/${uid}/status`);
  const [status] = useObjectVal(playerStatus);
  const [readyToPlay, setReadyToPlay] = useState(false);

  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  const [players] = useListVals(playerList);

  useEffect(() => {
    let ready = players
      .map((player) => {
        return !player.status;
      })
      .includes(true);
    setReadyToPlay(!ready);
  }, [players]);

  const navToClikBait = () => {
    db.database().ref(`/Rooms/${roomName}/`).update({ status: true });
  };

  const listener = db.database().ref(`/Rooms/${roomName}/status`);
  listener.on('value', function (snap) {
    console.log('test', snap.val());
    if (snap.val()) navigation.navigate('ClikBait');
  });

  useEffect(() => {
    uid &&
      db
        .database()
        .ref(`/Rooms/${roomName}/playerList/${uid}`)
        .update({ uid: uid, status: false });
  }, [uid]);

  function button() {
    db.database()
      .ref(`/Rooms/${roomName}/playerList/${uid}/`)
      .update({ status: !status });
  }

  // console.log('waiting room props', props);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {uid && <Text> {uid} </Text>}
      {readyToPlay && (
        <Button onPress={navToClikBait} title="READY!!!!!!!!!!!!!!!"></Button>
      )}
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

      <Button title="Ready!" onPress={() => button(roomName, uid)} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
