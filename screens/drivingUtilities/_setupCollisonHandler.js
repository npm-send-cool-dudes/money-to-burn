import Matter from 'matter-js';
import randomInt from 'random-int';
import { Alert } from 'react-native';
import { db } from '../../firebaseConfig';

const _setupCollisionHandler = (engine, width, roomName, uid, debris) => {
  Matter.Events.on(engine, 'collisionStart', (event) => {
    var pairs = event.pairs;

    var objA = pairs[0].bodyA.label;
    var objB = pairs[0].bodyB.label;

    if (objA === 'floor' && objB === 'debris') {
      Matter.Body.setPosition(pairs[0].bodyB, {
        x: randomInt(1, width - 30),
        y: randomInt(0, 200),
      });

      const currentScoreRef = db
        .database()
        .ref(`/Rooms/${roomName}/Game/Scores/${uid}`);
      currentScoreRef.transaction((currentScore = 0) => {
        return currentScore + 1;
      });
    }

    if (objA === 'ball' && objB === 'debris') {
      Alert.alert('Game Over', 'You lose...');
      db.database()
        .ref(`/Rooms/${roomName}/Game/AliveStatus/`)
        .update({ [uid]: false });
      debris.forEach((debrisItem) => {
        Matter.Body.set(debrisItem, {
          isStatic: true,
        });
      });
    }
  });
};

export default _setupCollisionHandler;
