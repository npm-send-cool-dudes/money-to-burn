import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Rating } from 'react-native-elements';

const clikBaitLogo = {
  uri: 'https://cdn.pixabay.com/photo/2016/08/28/17/30/mouse-1626473_1280.png',
  width: 64,
  height: 64,
};

const snakeLogo = {
  uri: 'https://st.depositphotos.com/1283262/1390/v/950/depositphotos_13907142-stock-illustration-cartoon-snake.jpg',
  width: 64,
  height: 64,
};


export default function GameCard(props) {
  return (
    <View style={styles.background}>
      <Image source={props.gameName==='clikBait'? clikBaitLogo: snakeLogo} style={styles.logo} />
      <View style={styles.gameCardRight}>
        <Text style={styles.gameName}>{props.gameName}</Text>
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
            onPress={() =>
              props.nav.navigate('WaitingRoom', {
                roomName: Math.floor(Math.random() * 10000),
                gameName: props.gameName,
              })
            }
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
    padding: 10,
  },
  gameName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'gamejot'
  },
  difficulty: {
    marginLeft: 80,
    fontSize: 15,
    fontFamily: 'gamejot'
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'gamejot'
  },
  playNow: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    width: 100,
    margin: 2,
  },
  select: {
    borderRadius: 10,
    backgroundColor: 'darkred',
    width: 100,
    margin: 2,
  },
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
