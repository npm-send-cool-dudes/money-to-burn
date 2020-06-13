import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

// import { ScrollView } from 'react-native-gesture-handler';
import GameCard from './utilities/gameCard';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E5FDFF',
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black',
    transform: [{ rotate: '-38deg' }],
  },
  headerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  buttonGroup: {
    flex: 1,
  },
  play: {
    backgroundColor: '#e5d9ff',
  },
  highScores: {
    backgroundColor: '#ffd9f4',
  },
  buttonText: {
    color: 'black',
  },
});

export default function GameSelector({ navigation }) {
  return (
    <ScrollView style={styles.background}>
      <Text>GAME SELECTOR</Text>
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
    </ScrollView>
  );
}
