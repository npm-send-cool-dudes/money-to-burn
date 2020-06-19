import React from 'react';
import { View } from 'react-native';
import { Constants } from './Constants';
function Tail({ position, size, elements }) {
  let tailList = elements.map((el, ind) => {
    return (
      <View
        key={ind}
        style={{
          width: size,
          height: size,
          backgroundColor: '#888888',
          position: 'absolute',
          left: el[0] * size,
          top: el[1] * size,
        }}
      />
    );
  });
  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
        position: 'absolute',
      }}
    >
      {tailList}
    </View>
  );
}

export default Tail;
