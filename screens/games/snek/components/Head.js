import React from 'react';
import { View } from 'react-native';

function Head({ position, size }) {
  const x = position[0];
  const y = position[1];
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: 'red',
        position: 'absolute',
        left: x * size,
        top: y * size,
      }}
    ></View>
  );
}

export default Head;
