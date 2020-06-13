import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Rating } from 'react-native-elements';
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
    padding: 10,
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
    margin: 2,
  },
  select: {
    backgroundColor: '#B796FF',
    width: 100,
    margin: 2,
  },
  logo: {
    margin: 10,
    marginRight: 40,
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
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={20}
          ratingBackgroundColor="#BFA0A0"
          ratingColor="#FFA1A1"
          readonly
        />
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
