import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db } from '../firebaseConfig';
import PlayerStatus from './utilities/playerStatus';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from 'react-native-elements';

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

  let playerStatus = db
    .database()
    .ref(`/Rooms/${roomName}/playerList/${uid}/status`);

  const [status] = useObjectVal(playerStatus);

  let playerList = db.database().ref(`/Rooms/${roomName}/playerList/`);
  const [players] = useListVals(playerList);
  //removed useeffect and put in firebase hook

  let roomStatusData = db.database().ref(`/Rooms/${roomName}/status`);
  const [roomStatus] = useObjectVal(roomStatusData);

  //grabbing nextGame from the DB
  let nextGameData = db.database().ref(`/Rooms/${roomName}/Game/Name`);
  const [nextGame] = useObjectVal(nextGameData);

  let gameObj = db.database().ref(`/GamesList/${gameName}`);
  const [gameRules] = useObjectVal(gameObj);

  //seperated navigation from the button click, so that when any user clicks the final ready button it navigates to the game
  if (roomStatus) {
    //for when users join this game, roomName does not exist so users don't automatically navigate to the right game
    console.log(roomName);
    navigation.navigate(nextGame, { roomName: roomName });
  }

  const ready = players
    .map((player) => {
      return player.status;
    })
    .includes(false);

  useEffect(() => {
    //added another line to the useffect to give the room a false statement
    db.database().ref(`/Rooms/${roomName}`).update({ status: false });
    //if you join the room, you don't have access to the gameName prop, so i set this up so when the first user creates the game, it gets pushed to the room. This is where all clients can access the next game for now. THis will be updates as we move the actual game rules onto the room object
    gameName &&
      db.database().ref(`/Rooms/${roomName}/Game`).update({ Name: gameName });

    //TODO i added the scoreboard functionality on here. I decided to undo it as it does make more sense to add the scores based on the game. What if snake doesn't use scores? it is here though in case somebody decided to go that route.
    // uid &&
    //   db
    //     .database()
    //     .ref(`/Rooms/${roomName}/Game/Scores`)
    //     .update({ [uid]: 0 });

    uid &&
      db
        .database()
        .ref(`/Rooms/${roomName}/playerList/${uid}`)
        .update({ uid: uid, status: false });
    //why are we adding a UID to our UID object on playerList? is this where we'll eventually store player names?
  }, [uid]);

  //this copies the gameRules from rules list onto our room object
  // useEffect(() => {
  //   gameRules &&
  //     db
  //       .database()
  //       .ref(`/Rooms/${roomName}/Game`)
  //       .update({ gameRules: gameRules.rules });
  // }, [gameRules]);

  function playerReady() {
    db.database()
      .ref(`/Rooms/${roomName}/playerList/${uid}/`)
      .update({ status: !status });
  }

  const navToGame = () => {
    //removed navigation from this function
    db.database().ref(`/Rooms/${roomName}/`).update({ status: true });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5FDFF',
      }}
    >
   <Image source={QRcode} style={styles.logo} />
  
      <Text style={styles.room}>{roomName}</Text>
      {loading && <Text> loading players... </Text>}

      <View style={{ margin: 10 }}>
        {players &&
          players.map((player) => (
            <PlayerStatus
              key={player.uid}
              name={player.uid}
              status={player.status ? 'Ready' : 'Waiting'}
            />
          ))}
      </View>
      {uid && <Text style={styles.user}>you: {uid} </Text>}
      <Button
        title="Ready!"
        buttonStyle={styles.ready}
        titleStyle={styles.buttonText}
        onPress={() => playerReady(roomName, uid)}
      />
      {!ready && (
        <Button
          buttonStyle={styles.start}
          titleStyle={styles.buttonText}
          onPress={navToGame}
          title="Let's Go!"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
  room: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'shortstack',
  },
  user: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'shortstack',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'gamejot',
  },
  ready: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  start: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
});
