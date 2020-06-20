// // code boilerplate from https://pusher.com/tutorials/game-device-sensors-react-native#prerequisites

// import React, { useState, useEffect, Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Button,
//   Alert,
// } from 'react-native';
// import {
//   accelerometer,
//   setUpdateIntervalForType,
//   SensorTypes,
// } from 'react-native-sensors'; // for getting sensor data

// import { GameEngine } from 'react-native-game-engine'; // for implementing the game
// import Matter from 'matter-js'; // for implementing game physics (gravity, collision)

// import randomInt from 'random-int'; // for generating random integer
// import randomColor from 'randomcolor'; // for generating random hex color codes

// import Circle from './utilities/circle';
// import Box from './utilities/box';

// import airFriction from './utilities/airFriction';
// import { render } from 'react-dom';

// const { height, width } = Dimensions.get('window');

// const BALL_SIZE = 20;
// const DEBRIS_HEIGHT = 70;
// const DEBRIS_WIDTH = 20;

// const mid_point = width / 2 - BALL_SIZE / 2;

// const ballSettings = {
//   isStatic: true,
// };

// const debrisSettings = {
//   isStatic: false,
// };

// const ball = Matter.Bodies.circle(0, height - 30, BALL_SIZE, {
//   ...ballSettings,
//   label: 'ball',
// });

// const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
//   isStatic: true,
//   isSensor: true,
//   label: 'floor',
// });

// setUpdateIntervalForType(SensorTypes.accelerometer, 15);

// export default class App extends Component {
//   state = {
//     x: 0,
//     y: height - 30,
//     isGameReady: false,
//     score: 0,
//   };

//   constructor(props) {
//     super(props);
//     this.debris = [];
//     const { engine, world } = this.addObjectsToWorld(ball);
//     this.entities = this._getEntities(engine, world, ball);

//     this._setupCollisionHandler(engine);

//     this.physics = (entities, { time }) => {
//       let engine = entities['physics'].engine;
//       engine.world.gravity.y = 0.5;
//       Matter.Engine.update(engine, time.delta);
//       return entities;
//     };
//   }

//   componentDidMount() {
//     accelerometer.subscribe(({ x }) => {
//       Matter.Body.setPosition(ball, {
//         x: this.state.x + x,
//         y: height - 30,
//       });

//       this.setState(
//         (state) => ({
//           x: x + state.x,
//         }),
//         () => {
//           // next: add code for resetting the ball's position if it goes out of view
//           if (this.state.x < 0 || this.state.x > width) {
//             Matter.Body.setPosition(ball, {
//               x: mid_point,
//               y: height - 30,
//             });

//             this.setState({
//               x: mid_point,
//             });
//           }
//         }
//       );
//     });

//     this.setState({
//       isGameReady: true,
//     });
//   }

//   componentWillUnmount() {
//     this.accelerometer.stop();
//   }
// }

// _addObjectsToWorld = (ball) => {
//   const engine = Matter.Engine.create({ enableSleeping: true });
//   const world = engine.world;

//   let objects = [ball, floor];

//   //create the bodies for blocks
//   for (let x = 0; x <= 5; x++) {
//     const debris = Matter.Bodies.rectangle(
//       randomInt(1, width - 30),
//       randomInt(0, 200),
//       DEBRIS_HEIGHT,
//       DEBRIS_WIDTH,
//       {
//         frictionAir: airFriction(0.01, 0.5),
//         label: 'debris',
//       }
//     );
//     this.debris.push(debris);
//   }
//   objects = objects.concat(this.debris);
//   Matter.World.add(world, objects);
//   return {
//     engine,
//     world,
//   };
// };

// _getEntities = (engine, world, ball) => {
//   const entities = {
//     physics: {
//       engine,
//       world,
//     },

//     playerBall: {
//       body: ball,
//       size: [BALL_SIZE, BALL_SIZE],
//       renderer: Circle,
//     },

//     gameFloor: {
//       body: floor,
//       size: [width, 10],
//       color: '#414448',
//       renderer: Box,
//     },
//   };

//   for (let x = 0; x <= 5; x++) {
//     Object.assign(entities, {
//       ['debris_' + x]: {
//         body: this.debris[x],
//         size: [DEBRIS_WIDTH, DEBRIS_HEIGHT],
//         color: randomColor({
//           luminosity: 'dark',
//         }),
//         renderer: Box,
//       },
//     });

//   return entities;
//   }}

// _setupCollisionHandler = (engine) => {
//   const pairs = event.pairs;

//   const objA = pairs[0].bodyA.label;
//   const objB = pairs[0].bodyB.label;

//   if (objA === 'floor' && objB === 'debris') {
//     Matter.Body.setPosition(pairs[0].bodyB, {
//       x: randomInt(1, width - 30),
//       y: randomInt(0, 200),
//     });

//     this.setState((state) => {
//       score: state.score + 1;
//     });

//     if (objA === 'ball' && objB === 'debris') {
//       Alert.alert('Game Over');
//       this.debris.forEach((debris) => {
//         Matter.Body.set(debris, {
//           isStatic: true,
//         });
//       });
//     }
//   }
// }

//   render(){
//     const { isGameReady, score } = this.state;

//     if (isGameReady) {
//       return (
//         <GameEngine
//           style={styles.container}
//           systems={[this.physics]}
//           entities={this.entities}
//         >
//           <View style={styles.header}>
//             <Button
//               onPress={this.reset}
//               title="Reset"
//               color="#841584"
//             />
//             <Text style={styles.scoreText}>{score}</Text>
//           </View>
//         </GameEngine>
//       );
//     }

//     return null;
//   }

//   reset = () => {

//     this.debris.forEach((debris) => {
//       Matter.Body.set(debris, {
//         isStatic: false
//       });
//       Matter.Body.setPosition(debris, {
//         x: randomInt(1, width - 30),
//         y: randomInt(0, 200)
//       });
//     });

//     this.setState({
//       score: 0
//     });
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   scoreText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
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
