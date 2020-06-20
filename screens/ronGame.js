import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import Circle from './utilities/circle';
import Box from './utilities/box';

import randomInt from 'random-int';
import randomColor from 'randomcolor';
import getRandomDecimal from './utilities/getRandomDecimal';

const { width, height } = Dimensions.get('screen');

const BALL_SIZE = 20;
const DEBRIS_HEIGHT = 70;
const DEBRIS_WIDTH = 20;

const ballSettings = {
  isStatic: true,
};

const ball = Matter.Bodies.circle(0, height - 30, BALL_SIZE, {
  ...ballSettings,
  label: 'ball',
});

const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
  isStatic: true,
  isSensor: true,
  label: 'floor',
});

const boxSize = Math.trunc(Math.max(width, height) * 0.075);

const initialBox = Matter.Bodies.rectangle(
  width / 2,
  height / 2,
  boxSize,
  boxSize,
  { isStatic: true }
);

// const floor = Matter.Bodies.rectangle(
//   width / 2,
//   height - boxSize / 2,
//   width,
//   boxSize,
//   { isStatic: true }
// );

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

// Matter.World.add(world, [initialBox, floor]);

const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = 0.3;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

let debris = [];

const _addObjectsToWorld = () => {
  let objects = [ball, floor];

  //create the bodies for blocks
  for (let x = 0; x <= 2; x++) {
    const debris2 = Matter.Bodies.rectangle(
      randomInt(1, width - 30),
      randomInt(0, 200),
      DEBRIS_HEIGHT,
      DEBRIS_WIDTH,
      {
        frictionAir: getRandomDecimal(0.01, 0.5),
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

  for (let x = 0; x <= 2; x++) {
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

      //   this.setState((state) => ({
      //     score: state.score + 1,
      //   }));
      //   console.log('point!');
    }

    if (objA === 'ball' && objB === 'debris') {
      Alert.alert('Game Over', 'You lose...');
      debris.forEach((debrisItem) => {
        Matter.Body.set(debrisItem, {
          isStatic: true,
        });
      });
    }
  });
};

_addObjectsToWorld(ball);
_getEntities();

_setupCollisionHandler();

console.log('world', world);
export default function App() {
  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(false);
  //   const [gravity, setGravity] = useState(0.5);

  useEffect(() => {
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

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(15);
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

  if (x && y) {
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
    </GameEngine>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
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
  },
});
