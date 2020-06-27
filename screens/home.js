import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { UserContext } from '../context/UserContext';

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
    color: 'black',
    fontFamily: 'gamejot',
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
    fontSize: 30,
    color: 'white',
    fontFamily: 'gamejot',
  },

  image: {
    height: 300,
    width: 300,
  },
});

const background = require('../assets/MoneyToBurn.gif');

export default function HomeScreen({ navigation }) {
  const context = useContext(UserContext);

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
          title="Logout"
          titleStyle={styles.buttonText}
          buttonStyle={styles.highScores}
          onPress={() => context.setLogout()}
        />
      </View>
    </View>
  );
}
