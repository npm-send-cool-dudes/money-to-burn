import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import roomCleanUp from '../utilFuncs/roomCleanUp';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import random_name from 'node-random-name';
import { Button } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ClikBait(props) {

  const [winner, setWinner] = useState();

  const [user, loading, error] = useAuthState(db.auth());
  //TODO change this line once room DB hook for games is done
  let uid = user.uid;
  let navigation = props.navigation;
  let roomName = props.route.params.roomName;

  //this may seem redundant as we are creating another playerlist further up, bit that playerlist is on the clikBait object, and this one is on the room. Eventually we will be moving clikBait onto the room itself so we wan't to use this for cleanup
  let playerListData = db.database().ref(`/Rooms/${roomName}/playerList`);
  const [playerList] = useListVals(playerListData);

  const [allScores] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Scores`)
  );

  //TODO This can be removed if we want to keep score handling on the waiting room
  useEffect(() => {
    const playerData = db.database().ref(`/Rooms/${roomName}/Game/Scores/`);
    playerData.update({ [uid]: 0 });
  }, []);

  //TODO look into refactoring, maybe remove useEffect
  //TODO clean up game object when done

  useEffect(() => {
    allScores &&
      Object.keys(allScores).map((userKey) => {
        if (allScores[userKey] >= 10) {
          setWinner(userKey);
        }
      });
  }, [allScores]);

  const [personalScore] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Scores/${uid}`)
  );

  function buttonPress() {
    const currentScoreRef = db
      .database()
      .ref(`/Rooms/${roomName}/Game/Scores/${uid}`);
    currentScoreRef.transaction((currentScore = 0) => {
      return currentScore + 1;
    });
    // //TODO delete the below code, using to test cloning data to another path
    // const room = db.database().ref(`/Rooms/${roomName}`);
    // room.update({ game: allScores });
  }
  /*need
  userNames
  currentScores
  targetScore (win condition)
*/
const [top,setTop]=useState(0);
const [left,setLeft]=useState(0)

useEffect(() => {
  const timer = setTimeout(() => {
    setTop(Math.abs(Math.floor(Math.random()*(height)-120)));
    setLeft(Math.abs(Math.floor(Math.random()*(width)-120)));
  }, 500);
  return () => clearTimeout(timer);
}, [top]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!winner && <View style={{position: "absolute",top: top, left: left, zindex:2}}>
          <Button 
          buttonStyle={styles.click}
          titleStyle={styles.buttonText}
          onPress={buttonPress} 
          title="click me"
          />
      </View>}
      {!winner && (
        <View style={{zindex: 1}}>
          {allScores &&
            Object.keys(allScores).map((userKey) => {
              if (userKey !== uid) {
                return (
                  <Text style={styles.player} key={userKey}>
                    {random_name({seed: userKey})} Score: {allScores[userKey]}
                  </Text>
                );
              }
            })}
          <Text style={styles.player}>Your Score: {personalScore}</Text>
        </View>
      )}
      {winner && (
        <View>
          {winner === uid? 
          <Text style={styles.player}>You Win!</Text> :
          <Text style={styles.player}>{random_name({seed: winner})} Wins!</Text>
          }
          <Button
            buttonStyle={styles.home}
            titleStyle={styles.buttonText}
            title="Home"
            onPress={() => roomCleanUp(navigation, roomName, uid, playerList)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 20,
    fontFamily: 'gamejot',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'gamejot',
  },
  home: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  click: {
    backgroundColor: 'purple',
    borderRadius: 10,
  },
  random: {
    position: "absolute",
    top: Math.floor(Math.random()*500),
    left: Math.floor(Math.random()*500),
  }
});
