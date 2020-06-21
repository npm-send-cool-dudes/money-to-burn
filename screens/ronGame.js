import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Dimensions, Alert, StatusBar } from 'react-native';

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Accelerometer } from 'expo-sensors';

import Circle from './utilities/circle';
import Box from './utilities/box';

import randomInt from 'random-int';
import randomColor from 'randomcolor';
import getRandomDecimal from './utilities/getRandomDecimal';

import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';

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

const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = 0.01;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

let debris = [];
let obstacleCount = 1;

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
          luminosity: 'dark',
        }),
        renderer: Box,
      },
    });
  }
  return entities;
};

const _setupCollisionHandler = (roomName, uid) => {
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
      db.database()
        .ref(`/Rooms/${roomName}/Game/AliveStatus/`)
        .update({ [uid]: false });
      Alert.alert('Game Over', 'You lose...');
      debris.forEach((debrisItem) => {
        Matter.Body.set(debrisItem, {
          isStatic: true,
        });
      });
    }
  });
};
_addObjectsToWorld();
_getEntities();

export default function App(props) {
  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(false);
  const [user, loading, error] = useAuthState(db.auth());
  const uid = user.uid;
  const roomName = props.route.params.roomName;

  const [allScores] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/Scores`)
  );
  const [aliveStatusRoom] = useObjectVal(
    db.database().ref(`/Rooms/${roomName}/Game/AliveStatus`)
  );

  //   const [gravity, setGravity] = useState(0.5);

  useEffect(() => {
    _setupCollisionHandler(roomName, uid);
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

  let { x, y, z } = data;

  //updates ball position based off accelerometer data
  if (y) {
    Matter.Body.setPosition(ball, {
      x: width / 2 - 200 * Number(x),
      y: height - height / 4,
    });
  }

  return (
    <GameEngine
      style={styles.container}
      systems={[Physics]}
      entities={_getEntities()}
    >
      <StatusBar hidden={true} />
      <Text style={styles.text}>Score</Text>
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    padding: 20,
  },
});
