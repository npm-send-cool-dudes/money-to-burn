import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 5,
  },
  highScores: {
    backgroundColor: '#ffd9f4',
    margin: 5,
  },
  buttonText: {
    color: 'black',
  },
});

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>MONEY TO BURN</Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Create Game"
          titleStyle={styles.buttonText}
          buttonStyle={styles.play}
          onPress={() => navigation.navigate('GameSelector')}
        />
        <Button
          title="Join Room"
          titleStyle={styles.buttonText}
          buttonStyle={styles.play}
          onPress={() => navigation.navigate('JoinRoom')}
        />
        <Button
          title="High Scores"
          titleStyle={styles.buttonText}
          buttonStyle={styles.highScores}
          onPress={() => navigation.navigate('HighScores')}
        />
      </View>
    </View>
  );
}
