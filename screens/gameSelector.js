import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import GameCard from './utilities/gameCard';
import { useListKeys } from 'react-firebase-hooks/database';
import { db } from '../firebaseConfig';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E5FDFF',
  },
});

export default function GameSelector({ navigation }) {
  const [gamesList, error, loading] = useListKeys(
    db.database().ref('/GamesList/')
  );

  console.log('gameslist', gamesList);
  return (
    <ScrollView style={styles.background}>
      <GameCard nav={navigation} gameName={gamesList[0]} />
    </ScrollView>
  );
}
