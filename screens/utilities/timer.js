import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

const handleTimerComplete = () => alert('FINISH!');
const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

const GameTimer = (props) => {
  const [playing, setPlaying] = useState(false);
  const timerDuration = 6000;

  useEffect(() => {
    setPlaying(true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Timer
        totalDuration={timerDuration}
        msecs
        start={playing}
        handleFinish={handleTimerComplete}
      />
    </View>
  );
};

export default GameTimer;
