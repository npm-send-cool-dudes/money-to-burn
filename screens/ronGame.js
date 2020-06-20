// - nouns
//   gameObject
//     - winState
// - verbs
//   move left/right
//   collide

// basic description:
// Obstacle Driving game:
// Game where a user controls lateral movement of a sprite using gyroscope controls to dodge incoming obstacles
//  features:
//      - players can increase or decrease speed of "driving" (really increasing speed of obstacles) to gain more points

// implementation:
// player shown his/her own screen with a point counter a top to display all players scores
// create world, player sprite, and obstacles
// add physics/functionality to world, player, and obstacles
// if collision, end scoring for player
// set timeout for game length to end (~1min?)

// Obstacle Driving game component
//   gameObject = object from firebase at path /Rooms/$roomCode
//   winState = highest number of objects dodged
//   return (
//     if winState exists
//       show who won
//     list of players and label for how many times they have clicked
//     if winState exists
//       button
//         when clicked return to home screen
//     if no winState exists
//       button
//         when clicked, updates click count for a given player
//   )
