import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FDFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Homescreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          transform: [{ rotate: '325deg' }],
          flexWrap: 'nowrap',
        }}
      >
        <Text
          style={{ fontSize: 50, flexDirection: 'row', flexWrap: 'nowrap' }}
        >
          MONEY TO BURN
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'space-between', padding: 60 }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: '#E5D9FF',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 250,
            }}
          >
            <Text style={{ color: 'black' }}>CREATE GAME</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: '#E5D9FF',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 250,
            }}
          >
            <Text style={{ color: 'black' }}>JOIN ROOM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: '#FFD9F4',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 250,
            }}
          >
            <Text style={{ color: 'black' }}>HIGH SCORES</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
