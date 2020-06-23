import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Accelerometer } from 'expo-sensors';

import Circle from './utilities/circle';
import Box from './utilities/box';

import randomInt from 'random-int';
import randomColor from 'randomcolor';
import getRandomDecimal from './utilities/getRandomDecimal';
import roomCleanUp from '../utilFuncs/roomCleanUp';
import _setupCollisionHandler from './drivingUtilities/_setupCollisonHandler';

import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal, useListVals } from 'react-firebase-hooks/database';

//setup game engine
const { width, height } = Dimensions.get('screen');

const BALL_SIZE = 20;
const DEBRIS_HEIGHT = 70;
const DEBRIS_WIDTH = 20;

const ball = Matter.Bodies.circle(0, height - 30, BALL_SIZE, {
  isStatic: true,
  label: 'ball',
});

const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
  isStatic: true,
  isSensor: true,
  label: 'floor',
});

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

const startGravity = 0.01;

let Physics = (entities, { time }) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = startGravity;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

const debris = [];
const obstacleCount = 3;

const _addObjectsToWorld = () => {
  let objects = [ball, floor];

  //create the bodies for blocks
  for (let x = 0; x <= obstacleCount; x++) {
    const debris2 = Matter.Bodies.rectangle(
      randomInt(1, width - 30),
      randomInt(0, 200),
      DEBRIS_HEIGHT,
      DEBRIS_WIDTH,
      {
        frictionAir: getRandomDecimal(0.015, 0.04),
        label: 'debris',
      }
    );
    debris.push(debris2);
  }
  objects = objects.concat(debris);
  Matter.World.add(world, objects);
  return {
    engine,
    world,
  };
};

const _getEntities = () => {
  const entities = {
    physics: {
      engine,
      world,
    },

    playerBall: {
      body: ball,
      size: [BALL_SIZE, BALL_SIZE],
      renderer: Circle,
    },

    gameFloor: {
      body: floor,
      size: [width, 10],
      color: '#414448',
      renderer: Box,
    },
  };

  for (let x = 0; x <= obstacleCount; x++) {
    Object.assign(entities, {
      ['debris_' + x]: {
        body: debris[x],
        size: [DEBRIS_WIDTH, DEBRIS_HEIGHT],
        color: randomColor({
          luminosity: 'light',
        }),
        renderer: Box,
      },
    });
  }

  return entities;
};

const reset = () => {
  debris.forEach((debris) => {
    // loop through all the blocks
    Matter.Body.set(debris, {
      isStatic: false, // make the block susceptible to gravity again
    });
    Matter.Body.setPosition(debris, {
      // set new position for the block
      x: randomInt(1, width - 30),
      y: randomInt(0, 200),
    });
  });
};

_addObjectsToWorld();
_getEntities();

export default function App(props) {
  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(false);
  const [winner, setWinner] = useState();
  const [user, loading, error] = useAuthState(db.auth());
  const uid = user.uid;
  const roomName = props.route.params.roomName;
  const navigation = props.navigation;

  const playerListData = db.database().ref(`/Rooms/${roomName}/playerList`);
  const [playerList] = useListVals(playerListData);

  const [allScores] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Scores`)
  );
  const [aliveStatusRoom] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/AliveStatus`)
  );

  //win conditions are either first to a set score or highest score(s) if all are dead
  useEffect(() => {
    allScores &&
      Object.keys(allScores).map((userKey) => {
        if (allScores[userKey] >= 10) {
          _unsubscribe();
          setWinner([userKey]);
        }
      });
  }, [allScores]);

  useEffect(() => {
    if (aliveStatusRoom && !Object.values(aliveStatusRoom).includes(true)) {
      const scores = Object.entries(allScores);
      const winnersAndScores = [];
      scores.forEach((player, index) => {
        if (index === 0) {
          winnersAndScores.push(player);
        } else {
          if (player[1] > winnersAndScores[0][1]) {
            winnersAndScores = [player];
          } else if (player[1] === winnersAndScores[0][1]) {
            winnersAndScores.push(player);
          }
        }
      });
      const winners = winnersAndScores.map((p) => p[0]);
      _unsubscribe();
      setWinner(winners);
    }
  }, [aliveStatusRoom]);

  //utilities to change gravity of game
  const [gravity, setGravity] = useState(0.1);

  const gravityIncrementer = 0.05;

  const increaseGravity = () => {
    setGravity(gravity + gravityIncrementer);
    Physics = (entities, { time }) => {
      let engine = entities['physics'].engine;
      engine.world.gravity.y = gravity;
      Matter.Engine.update(engine, time.delta);
      return entities;
    };
  };

  const decreaseGravity = () => {
    if (gravity > 0.01) {
      setGravity(gravity - gravityIncrementer);
      Physics = (entities, { time }) => {
        let engine = entities['physics'].engine;
        engine.world.gravity.y = gravity;
        Matter.Engine.update(engine, time.delta);
        return entities;
      };
    }
  };

  useEffect(() => {
    Physics = (entities, { time }) => {
      let engine = entities['physics'].engine;
      engine.world.gravity.y = startGravity;
      Matter.Engine.update(engine, time.delta);
      return entities;
    };

    _setupCollisionHandler(engine, width, roomName, uid, debris);
  }, []);

  //set inital scoring for person, set starting aliveStatus, and subscribe to accelerometer lateral motion
  useEffect(() => {
    db.database()
      .ref(`/Rooms/${roomName}/Game/Scores/`)
      .update({ [uid]: 0 });
    db.database()
      .ref(`/Rooms/${roomName}/Game/AliveStatus/`)
      .update({ [uid]: true });
    _toggle();
    reset();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    console.log('subscripted');
    //set how smooth player control of sprite is
    Accelerometer.setUpdateInterval(100);

    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    console.log('unsciripted');

    subscription && subscription.remove();
    setSubscription(null);
  };

  let { x, y, z } = data;

  //updates ball position based off accelerometer data
  if (y) {
    Matter.Body.setPosition(ball, {
      x: width / 2 - 200 * Number(x),
      y: height - height / 4,
    });
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="stretch"
      source={{
        uri:
          'https://i.pinimg.com/originals/c9/46/27/c94627ca6c5147bc87157df09027ded3.gif',
      }}
    >
      {!winner && (
        <GameEngine systems={[Physics]} entities={_getEntities()}>
          {allScores &&
            Object.keys(allScores).map((userKey) => {
              return (
                <Text key={userKey} style={styles.text}>
                  {userKey}: {allScores[userKey]}
                </Text>
              );
            })}
        </GameEngine>
      )}
      {winner && (
        <Text style={styles.winner}>
          Winner(s):
          {winner.map((player) => (
            <Text key={player} style={styles.winner}>
              {'\n'}
              {player}
            </Text>
          ))}
        </Text>
      )}
      {winner && (
        <Button
          title="Go Home"
          onPress={() => roomCleanUp(navigation, roomName, uid, playerList)}
        >
          GO HOME!
        </Button>
      )}
      <View style={styles.controls}>
        <Button
          buttonStyle={styles.decrease}
          title="Decrease!"
          onPress={decreaseGravity}
        />
        <Button
          buttonStyle={styles.increase}
          title="Increase!"
          onPress={increaseGravity}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 5,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
  },
  increase: {
    backgroundColor: 'green',
    width: width / 2,
    height: height / 10,
  },
  decrease: {
    backgroundColor: 'red',
    width: width / 2,
    height: height / 10,
  },
  winner: {
    flex: 1,
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: height / 2 - height / 6,
  },
});
