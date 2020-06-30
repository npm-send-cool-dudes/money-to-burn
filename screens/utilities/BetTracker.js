import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { db } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useListVals } from 'react-firebase-hooks/database';

const BetTracker = ({ roomName, bet, setBet }) => {
  const [user, userLoading, error] = useAuthState(db.auth());

  const [bettingRoom, roomLoading] = useListVals(
    db.database().ref(`/Rooms/${roomName}/Bets`)
  );

  let uid = user.uid;

  useEffect(() => {
    console.log(bettingRoom);
  }, [bettingRoom]);
  function submitBet() {
    const currentBetRef = db
      .database()
      .ref(`/Rooms/${roomName}/Bets/`)
      .update({ [uid]: bet });
  }

  return (
    <View style={{alignContent: 'center', justifyContent: 'center', marginBottom: 30}}>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'shortstack',
          alignSelf: 'center',
          justifySelf: 'flex-end',
        }}
      >
        Put {bet} stacks on the line?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E5FDFF',
        }}
      >
        <Button
          title="Add 1"
          titleStyle={styles.buttonText}
          buttonStyle={styles.add}
          onPress={() => {
            setBet(bet + 1);
          }}
        />
        <Button
          title="Take 1"
          titleStyle={styles.buttonText}
          buttonStyle={styles.subtract}
          onPress={() => {
            bet >= 1 ? setBet(bet - 1) : null;
          }}
        ></Button>
      </View>
      <Button
        title="Place Bet!"
        titleStyle={styles.buttonText}
        buttonStyle={styles.subtract}
        onPress={submitBet}
      ></Button>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'shortstack',
          alignSelf: 'center',
          justifySelf: 'flex-end',
        }}
      >
        Money in the Pot
      </Text>

      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'shortstack',
          alignSelf: 'center',
          justifySelf: 'flex-end',
        }}
      >
        {!roomLoading && bettingRoom && bettingRoom.length > 0
          ? bettingRoom.reduce(
              (accumulator, currentValue) => accumulator + currentValue
            )
          : null}
      </Text>
    </View>
  );
};

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
  add: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  subtract: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
});

export default BetTracker;
