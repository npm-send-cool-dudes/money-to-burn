import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E5D9FF',
    flexDirection: 'row',
    margin: 5,
  },
  gameCardRight: {
    justifyContent: 'flex-end',
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  difficulty: {
    fontSize: 10,
  },
  buttonText: {
    color: 'black',
  },
  playNow: {
    backgroundColor: '#FFA1A1',
  },
  select: {
    backgroundColor: '#B796FF',
  },
});

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

export default function GameCard({ navigation }, gameList) {
  return (
    <View style={styles.background}>
      <Image source={logo} />
      <View style={styles.gameCardRight}>
        <Text style={styles.gameTitle}>ClikBait</Text>
        <Text style={styles.difficulty}> Difficulty</Text>
        <Button
          title="Play Now"
          titleStyle={styles.buttonText}
          buttonStyle={styles.playNow}
        />
        <Button
          title="Select"
          titleStyle={styles.buttonText}
          buttonStyle={styles.select}
        />
      </View>
    </View>
  );
}
