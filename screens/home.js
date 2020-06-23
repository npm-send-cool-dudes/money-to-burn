import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, ImageBackground } from 'react-native';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5FDFF',
  },
  header: {
    marginTop: 40,
    marginLeft: 150,
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'gamejot',
    // transform: [{ rotate: '-38deg' }],
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
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  highScores: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'gamejot'
  },
 
  image: {
    height: 300,
    width: 300,
  },
});

const background = {
  uri:
  'https://media.giphy.com/media/xT9DPofgEkyu9t4wPm/giphy.gif',
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.headerBox}>
      <ImageBackground source={background} style={styles.image} opacity={100}>
        <Text style={styles.header}>MONEY TO BURN</Text>
      </ImageBackground>
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
