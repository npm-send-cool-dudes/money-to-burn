import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    padding: 10,
  },
  status: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'shortstack',
  },
});

export default function PlayerStatus(props) {
  return (
    <View
      style={{
        ...styles.background,
        backgroundColor: props.status === 'Waiting' ? 'pink' : 'lightgreen',
      }}
    >
      <Text style={styles.status}>Player: {props.name}</Text>
      <Text style={styles.status}>Status: {props.status}</Text>
    </View>
  );
}
