// game based off tutorial from https://pusher.com/tutorials/game-device-sensors-react-native#prerequisites

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Accelerometer } from 'expo-sensors';

import Circle from './asteroidAdventureUtilities/circle';
import Box from './asteroidAdventureUtilities/box';

import randomInt from 'random-int';
import randomColor from 'randomcolor';
import getRandomDecimal from './asteroidAdventureUtilities/getRandomDecimal';
import roomCleanUp from '../utilFuncs/roomCleanUp';

import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal, useListVals } from 'react-firebase-hooks/database';

//setup game engine
const { width, height } = Dimensions.get('screen');

const BALL_SIZE = 20;
const DEBRIS_HEIGHT = 50;
const DEBRIS_WIDTH = 50;

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

const startGravity = 0.1;

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

//reset position and velocityu of all blocks
const reset = () => {
  debris.forEach((debrisItem) => {
    Matter.Body.set(debrisItem, {
      velocity: { x: 0, y: 0 },
    });
  });
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

  const [playerList] = useListVals(
    db.database().ref(`/Rooms/${roomName}/playerList`)
  );

  const [allScores] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Scores`)
  );
  const [aliveStatusRoom] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/AliveStatus`)
  );

  const _setupCollisionHandler = () => {
    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      if (objA === 'floor' && objB === 'debris') {
        Matter.Body.setPosition(pairs[0].bodyB, {
          x: randomInt(1, width - 30),
          y: randomInt(0, 200),
        });

        const currentScoreRef = db
          .database()
          .ref(`/Rooms/${roomName}/Game/Scores/${uid}`);
        currentScoreRef.transaction((currentScore = 0) => {
          return currentScore + 1;
        });
      }

      if (objA === 'ball' && objB === 'debris') {
        Alert.alert('Game Over');
        db.database()
          .ref(`/Rooms/${roomName}/Game/AliveStatus/`)
          .update({ [uid]: false });

        // stop all blocks once dead
        debris.forEach((debris) => {
          // loop through all the blocks
          Matter.Body.set(debris, {
            isStatic: true,
          });
        });
      }
    });
  };

  //set inital scoring for person, set starting aliveStatus, and subscribe to accelerometer lateral motion
  useEffect(() => {
    db.database()
      .ref(`/Rooms/${roomName}/Game/Scores/`)
      .update({ [uid]: 0 });
    db.database()
      .ref(`/Rooms/${roomName}/Game/AliveStatus/`)
      .update({ [uid]: true });
    _toggle();
    _setupCollisionHandler();
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  //win conditions are either first to a set score or highest score(s) if all are dead
  const pointsToWin = 30;

  useEffect(() => {
    allScores &&
      Object.keys(allScores).map((userKey) => {
        if (allScores[userKey] >= pointsToWin) {
          setWinner([userKey]);
        }
      });
  }, [allScores]);

  useEffect(() => {
    if (aliveStatusRoom && !Object.values(aliveStatusRoom).includes(true)) {
      const scores = Object.entries(allScores);
      let winnersAndScores = [];
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

  //reset gravity to default on each new game
  useEffect(() => {
    Physics = (entities, { time }) => {
      let engine = entities['physics'].engine;
      engine.world.gravity.y = startGravity;
      Matter.Engine.update(engine, time.delta);
      return entities;
    };
  }, []);

  //cleanup after game ends
  useEffect(() => {
    return () => {
      reset();
      _unsubscribe();
    };
  }, []);

  //updates ball position based off accelerometer data
  let { x, y, z } = data;
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
          title="Brake"
          onPress={decreaseGravity}
        />
        <Button
          buttonStyle={styles.increase}
          title="Accelerate"
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
