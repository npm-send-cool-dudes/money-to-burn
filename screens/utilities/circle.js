import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { height, width } = Dimensions.get('window');

const BODY_DIAMETER = Math.trunc(Math.max(width, height) * 0.1);
// const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

const Circle = ({ body }) => {
  const { position } = body;
  const x = position.x - BODY_DIAMETER / 2;
  const y = position.y - BODY_DIAMETER / 2;
  return (
    <View style={[styles.head, { left: x, top: y }]}>
      <Image
        style={styles.spaceShip}
        source={require('../drivingUtilities/player.png')}
        // player.png Credit "Kenney.nl"
      />
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  head: {
    // backgroundColor: '#FF5877',
    // borderColor: '#FFC1C1',
    // borderWidth: BORDER_WIDTH,
    // width: BODY_DIAMETER,
    // height: BODY_DIAMETER,
    // position: 'absolute',
    // borderRadius: BODY_DIAMETER * 2,
  },
  spaceShip: {
    width: BODY_DIAMETER,
    height: BODY_DIAMETER,
    resizeMode: 'contain',
  },
});
