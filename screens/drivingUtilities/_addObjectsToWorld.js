import Matter from 'matter-js';
import randomInt from 'random-int';
import getRandomDecimal from '../utilities/getRandomDecimal';
import Circle from '../utilities/circle';
import Box from '../utilities/box';
import { width, height, ball, BALL_SIZE } from '../ronGame';
import randomColor from 'randomcolor';

const DEBRIS_HEIGHT = 70;
const DEBRIS_WIDTH = 20;

const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
  isStatic: true,
  isSensor: true,
  label: 'floor',
});

export const _addObjectsToWorld = (obstacleCount, debris, engine, world) => {
  let objects = [ball, floor];

  //create the bodies for blocks
  for (let x = 0; x <= obstacleCount; x++) {
    const debris2 = Matter.Bodies.rectangle(
      randomInt(1, width - 30),
      randomInt(0, 200),
      DEBRIS_HEIGHT,
      DEBRIS_WIDTH,
      {
        frictionAir: getRandomDecimal(0.015, 0.04),
        label: 'debris',
      }
    );
    debris.push(debris2);
  }
  objects = objects.concat(debris);
  Matter.World.add(world, objects);
  return {
    engine,
    world,
  };
};

// export const _getEntities = (engine, world, obstacleCount, debris) => {
//   const entities = {
//     physics: {
//       engine,
//       world,
//     },

//     playerBall: {
//       body: ball,
//       size: [BALL_SIZE, BALL_SIZE],
//       renderer: Circle,
//     },

//     gameFloor: {
//       body: floor,
//       size: [width, 10],
//       color: '#414448',
//       renderer: Box,
//     },
//   };

//   for (let x = 0; x <= obstacleCount; x++) {
//     Object.assign(entities, {
//       ['debris_' + x]: {
//         body: debris[x],
//         size: [DEBRIS_WIDTH, DEBRIS_HEIGHT],
//         color: randomColor({
//           luminosity: 'light',
//         }),
//         renderer: Box,
//       },
//     });
//   }

//   return entities;
// };
