/* 

  The only function that is required in this file is the "move" function

 The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")
  
  The "move" function should accept two arguments that the website will be passing in: 
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

*/

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;
  var dir;
  if (myHero.health < 61) {

    console.log('Looking for health.');
    dir = helpers.findNearestHealthWell(gameData);
  } else if (myHero.health < 81) {

    console.log('Looking for diamonds.');
    dir = helpers.findNearestNonTeamDiamondMine(gameData);
  } else {

    console.log('Looking for blood.');
    dir = helpers.findNearestWeakerEnemy(gameData);
    console.log('Found weak enemy: ', dir);
    if(!dir) {

      console.log('No weak enemies, looking for anyone.');
      dir = helpers.findNearestEnemy(gameData);
    }
  }
  // also check potentially close enemy and hit full force
  var close = helpers.getDistanceToNearestEnemy(gameData);
  if(close.distance < 2) {
    dir = helpers.findNearestEnemy(gameData);
  };

  console.log('Direction: ', dir);
  console.log('Nearest friend: ', helpers.getDistanceToNearestFriend(gameData));
  return dir;
};
// // The "Safe Diamond Miner"
// The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };


// Export the move function here
module.exports = move;
