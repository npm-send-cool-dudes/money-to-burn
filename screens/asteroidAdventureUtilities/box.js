import React from 'react';
import { View, Image } from 'react-native';

const Box = ({ body, size, color }) => {
  const width = size[0];
  const height = size[1];

  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: 'transparent',
      }}
    >
      <Image
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',
          // left: -11,
          // bottom: 10,
        }}
        source={require('./meteorSmall.png')}
        // meteorSmall.png Credit "Kenney.nl"
      />
    </View>
  );
};

export default Box;
