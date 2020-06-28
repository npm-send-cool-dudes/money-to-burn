import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Rating } from 'react-native-elements';

const clikBaitLogo = {
  uri: 'https://cdn.pixabay.com/photo/2016/08/28/17/30/mouse-1626473_1280.png',
};

const snakeLogo = {
  uri: 'https://st.depositphotos.com/1283262/1390/v/950/depositphotos_13907142-stock-illustration-cartoon-snake.jpg',
};

const asteroidLogo ={
  uri: 'https://images.news18.com/ibnlive/uploads/2020/06/1592988882_untitled-design-91.jpg?impolicy=website&width=536&height=356',
}

const newLogo = {
  uri: 'https://www.kindpng.com/picc/m/219-2197017_new-logo-png-small-new-icon-png-transparent.png'
}

export default function GameCard(props) {
  let logo, rating;
  switch (props.gameName) {
    case 'clikBait':
      logo = clikBaitLogo;
      rating= 4;
      break;
    case 'snek':
      logo = snakeLogo;
      rating = 4.5;
      break;
    case 'Asteroid Adventure':
      logo = asteroidLogo;
      rating = 5;
      break;
    default: 
    logo = newLogo;
    rating = 3;
    break;
  }

  return (
    <View style={styles.background}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.gameCardRight}>
        <Text style={styles.gameName}>{props.gameName}</Text>
          <Text style={styles.rating}> Rating</Text>
          <Rating
            type="custom"
            ratingCount={5}
            imageSize={20}
            ratingBackgroundColor='darkgray'
            ratingColor='darkred'
            readonly
            startingValue={rating}
            style={{ margin: 2 , backgroundColor: 'pink'}}
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
    backgroundColor: 'pink',
    flexDirection: 'row',
    margin: 5,
    marginTop: 3,
    borderRadius: 20
  },
  gameCardRight: {
    marginTop: 3,
    padding: 10,
  },
  gameName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'gamejot'
  },
  rating: {
    marginLeft: 85,
    fontSize: 17,
    marginTop: 5,
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
    borderRadius: 10,
    height: 100, 
    width: 100,
    margin: 10,
    marginRight: 15,
  },
});
