import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const BetTracker = () => {
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'shortstack',
          alignSelf: 'center',
          justifySelf: 'flex-end',
        }}
      >
        Money in the Pot
      </Text>
      <br></br>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontFamily: 'shortstack',
          alignSelf: 'center',
          justifySelf: 'flex-end',
        }}
      >
        0
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E5FDFF',
        }}
      >
        <Button
          title="Add 1"
          titleStyle={styles.buttonText}
          buttonStyle={styles.add}
          onPress={() => {
            console.log('ADD');
          }}
        />
        <Button
          title="Take 1"
          titleStyle={styles.buttonText}
          buttonStyle={styles.subtract}
          onPress={() => {
            console.log('subtract');
          }}
        >
          -
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  room: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'shortstack',
  },
  user: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'shortstack',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'gamejot',
  },
  add: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  subtract: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
});

export default BetTracker;
