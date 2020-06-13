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
    flex: 2,
    justifyContent: 'flex-end',
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  difficulty: {
    fontSize: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  playNow: {
    backgroundColor: '#FFA1A1',
    width: 100,
  },
  select: {
    backgroundColor: '#B796FF',
    width: 100,
  },
  logo: {
    flex: 1,
    margin: 10,
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
      <Image source={logo} style={styles.logo} />
      <View style={styles.gameCardRight}>
        <Text style={styles.gameTitle}>ClikBait</Text>
        <Text style={styles.difficulty}> Difficulty</Text>
        <View style={styles.buttonGroup}>
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
    </View>
  );
}
