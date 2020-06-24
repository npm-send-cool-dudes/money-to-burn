import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Head from './components/Head';
import Food from './components/Food';
import Tail from './components/Tail';
import { Constants } from './components/Constants';
import { GameLoop } from './components/GameLoop';

function Snek() {
  const [boardSize, setBoardSize] = useState(
    Constants.GRID_SIZE * Constants.CELL_SIZE
  );
  const [engine, setEngine] = useState(null);
  const [state, setState] = useState({ running: true });

  const collisionEvent = (e) => {
    if (e.type === 'game-over') {
      Alert.alert('Game Over');
      setState({ running: false });
    }
  };

  //function to randomize coordinates for the next piece of food
  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //reset the game to default state for the next round of the game
  const reset = () => {
    engine.swap({
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        updateFrequency: 5,
        nextMove: 10,
        size: Constants.CELL_SIZE,
        renderer: <Head />,
      },
      food: {
        position: [
          randomBetween(0, Constants.GRID_SIZE - 1),
          randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setState({ running: true });
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setEngine(ref);
        }}
        style={{
          width: boardSize,
          height: boardSize,
          flex: null,
          backgroundColor: '#fff',
        }}
        entities={{
          head: {
            position: [0, 0],
            xspeed: 1,
            yspeed: 0,
            updateFrequency: 5,
            nextMove: 10,
            size: Constants.CELL_SIZE,
            renderer: <Head />,
          },
          food: {
            position: [
              randomBetween(0, Constants.GRID_SIZE - 1),
              randomBetween(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
        }}
        systems={[GameLoop]}
        onEvent={collisionEvent}
        running={state.running}
      ></GameEngine>
      <Button title="New Game" onPress={reset}></Button>

      {/* control buttons */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: 'move-up' });
            }}
          >
            <View style={styles.control}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: 'move-left' });
            }}
          >
            <View style={styles.control}></View>
          </TouchableOpacity>

          <View style={[styles.control, { backgroundColor: null }]}></View>

          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: 'move-right' });
            }}
          >
            <View style={styles.control}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engine.dispatch({ type: 'move-down' });
            }}
          >
            <View style={styles.control}></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

//styling controlled here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    width: 300,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'grey',
  },
});

export default Snek;
