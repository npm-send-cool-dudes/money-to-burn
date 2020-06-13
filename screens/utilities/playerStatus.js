import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

export default function PlayerStatus(props) {
  return (
    <View style={styles.background}>
      <View style={styles.gameCardRight}>
        <Text style={styles.gameTitle}>{props.name}</Text>
        <Text style={styles.difficulty}>{props.name.status}</Text>
      </View>
    </View>
  );
}
