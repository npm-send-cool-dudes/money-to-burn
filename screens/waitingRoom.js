import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db } from '../firebaseConfig';
import PlayerStatus from './utilities/playerStatus';
import {
  useListVals,
  useObjectVal,
  useList,
} from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from 'react-native-elements';
import BetTracker from './utilities/BetTracker';
// import random_name from 'node-random-name';

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
  const [bet, setBet] = useState(0);

  let [dbUserObj, dbUserObjLoading] = useObjectVal(
    db.database().ref(`/Users/${uid}`)
  );
  let playerStatus = db
    .database()
    .ref(`/Rooms/${roomName}/playerList/${uid}/status`);

  const [status] = useObjectVal(playerStatus);

  let [players] = useListVals(
    db.database().ref(`/Rooms/${roomName}/playerList/`)
  );

  let [roomStatus] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/status`)
  );

  let [bettingRoom] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Bets`)
  );
  //grabbing nextGame from the DB
  let [nextGame] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Name`)
  );

  let [gameRules] = useObjectVal(db.database().ref(`/GamesList/${gameName}`));

  //seperated navigation from the button click, so that when any user clicks the final ready button it navigates to the game
  if (roomStatus) {
    //for when users join this game, roomName does not exist so users don't automatically navigate to the right game
    navigation.navigate(nextGame, { roomName: roomName });
  }

  const ready = players
    .map((player) => {
      return player.status;
    })
    .includes(false);

  // useEffect(() => {
  //   db.database()
  //     .ref(`/Rooms/${roomName}/Bets`)
  //     .set({ [uid]: bet });
  // }, [players]);

  useEffect(() => {
    //added another line to the useffect to give the room a false statement
    db.database().ref(`/Rooms/${roomName}`).update({ status: false });
    //if you join the room, you don't have access to the gameName prop, so i set this up so when the first user creates the game, it gets pushed to the room. This is where all clients can access the next game for now. THis will be updates as we move the actual game rules onto the room object
    gameName &&
      db.database().ref(`/Rooms/${roomName}/Game`).update({ Name: gameName });

    db.database()
      .ref(`/Rooms/${roomName}/Bets`)
      .update({ [uid]: bet });

    //TODO i added the scoreboard functionality on here. I decided to undo it as it does make more sense to add the scores based on the game. What if snake doesn't use scores? it is here though in case somebody decided to go that route.
    // uid &&
    //   db
    //     .database()
    //     .ref(`/Rooms/${roomName}/Game/Scores`)
    //     .update({ [uid]: 0 });

    uid &&
      dbUserObj &&
      db.database().ref(`/Rooms/${roomName}/playerList/${uid}`).update({
        displayName: dbUserObj.displayName,
        status: false,
        stacks: dbUserObj.stacks,
      });
    //why are we adding a UID to our UID object on playerList? is this where we'll eventually store player names?
  }, [loading, dbUserObjLoading]);

  //this copies the gameRules from rules list onto our room object
  useEffect(() => {
    gameRules &&
      db
        .database()
        .ref(`/Rooms/${roomName}/Game`)
        .update({ gameRules: gameRules.rules });
  }, [gameRules]);

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
      <BetTracker roomName={roomName} bet={bet} setBet={setBet}></BetTracker>
      {/* <Image source={QRcode} style={styles.logo} /> */}

      <Text style={styles.room}>Room Number: {roomName}</Text>
      {loading && <Text> loading players... </Text>}

      <View style={{ margin: 10 }}>
        {players &&
          players.map((player) => {
            return (
              <PlayerStatus
                key={player.uid}
                name={player.displayName}
                status={player.status ? 'Ready' : 'Waiting'}
              />
            );
          })}
      </View>
      {uid && dbUserObj && (
        <Text style={styles.user}>stacks: {dbUserObj.stacks} </Text>
      )}
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
    alignSelf: 'center',
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
    marginTop: 30,
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  start: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
});
