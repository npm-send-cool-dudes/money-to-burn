import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

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
        />
        <Button
          title="Join Room"
          titleStyle={styles.buttonText}
          buttonStyle={styles.play}
        />
        <Button
          title="High Scores"
          titleStyle={styles.buttonText}
          buttonStyle={styles.highScores}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5FDFF',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    transform: [{ rotate: '-45deg' }],
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
    margin: '20px',
  },
  highScores: {
    backgroundColor: '#ffd9f4',
    margin: '20px',
  },
  buttonText: {
    color: 'black',
  },
});
