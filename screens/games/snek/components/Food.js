import React from 'react';
import { View } from 'react-native';

function Food({ position, size }) {
  let x = position[0];
  let y = position[1];

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: 'blue',
        position: 'absolute',
        left: x * size,
        top: y * size,
      }}
    ></View>
  );
}

export default Food;
