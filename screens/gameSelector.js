import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import GameCard from './utilities/gameCard';
import { useListKeys } from 'react-firebase-hooks/database';
import { db } from '../firebaseConfig';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E5FDFF',
    paddingVertical: 60
  },
});

export default function GameSelector({ navigation }) {
  const [gamesList, error, loading] = useListKeys(
    db.database().ref('/GamesList/')
  );
  // TODO map over gameslist to render GameCards
  // console.log('gameslist', gamesList);
  return (
  
      <ScrollView style={styles.background}>
      {gamesList.map((game, index) => (
        <GameCard
          key={gamesList[index]}
          nav={navigation}
          gameName={gamesList[index]}
        />
      ))}
    </ScrollView>


  );

}
