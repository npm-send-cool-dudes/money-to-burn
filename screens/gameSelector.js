import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GameCard from './utilities/gameCard';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E5FDFF',
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
