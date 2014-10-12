/*

If you'd like to test your hero code locally,
run this code using node (must have node installed).

Please note that you DO NOT need to do this to enter javascript
battle, it is simply an easy way to test whether your new hero 
code will work in the javascript battle.

To run:

  -Install node
  -Run the following in your terminal:

    node test_your_hero_code.js

  -If you don't see any errors in your terminal, the code works!

*/

//Get the helper file and the Game logic
var helpers = require('./helpers.js');
var Game = require('./game_logic/Game.js');

//Get my hero's move function ("brain")
var heroMoveFunction = require('./hero.js');
var friendAssasin = require('./friend_assasin.js');
var friendHunter = require('./friend_diamond_hunter.js');

//The move function ("brain") the practice enemy will use
var enemyMoveFunction = require('./enemy_assasin.js');
var enemySecondAssasin = require('./enemy_wise_assasin.js');
var enemyPriest = require('./enemy_priest');

//Makes a new game with a 25x25 board
var game = new Game(25);

//Add health wells
game.addHealthWell(2,2);
game.addHealthWell(5,5);
game.addHealthWell(8,15);

//Add diamond mines
game.addDiamondMine(2,1);
game.addDiamondMine(2,3);
game.addDiamondMine(2,11);
game.addDiamondMine(12,23);
game.addDiamondMine(8,10);
game.addDiamondMine(5,9);

//Add your hero in the top left corner of the map (team 0)
game.addHero(0, 0, 'MyHero', 0);
game.addHero(4, 0, 'FriendAssasin', 0);
game.addHero(7, 0, 'FriendHunter', 0);

//Add an enemy hero in the bottom left corner of the map (team 1)
game.addHero(24, 24, 'Enemy', 1);
game.addHero(12, 24, 'EnemyAssasin', 1);
game.addHero(8, 24, 'EnemyPriest', 1);

console.log('About to start the game!  Here is what the board looks like:');

//You can run game.board.inspect() in this test code at any time
//to log out the current state of the board (keep in mind that in the actual
//game, the game object will not have any functions on it)
game.board.inspect();

//Play a very short practice game
var turnsToPlay = 240;

for (var i=0; i<turnsToPlay; i++) {
  var hero = game.activeHero;
  var direction;
  if (hero.name === 'MyHero') {

    //Ask your hero brain which way it wants to move
    direction = heroMoveFunction(game, helpers);
  } else if (hero.name === 'FriendAssasin') {

    direction = friendAssasin(game, helpers);
    
  } else if (hero.name === 'FriendHunter') {
    
    direction = friendHunter(game, helpers);

  } else if (hero.name === 'Enemy') {

    direction = enemyMoveFunction(game, helpers);

  } else if (hero.name === 'EnemyAssasin') {

    direction = enemySecondAssasin(game, helpers);

  } else if (hero.name === 'EnemyPriest') {

    direction = enemyPriest(game, helpers);

  }
  console.log('-----');
  console.log('Turn ' + i + ':');
  console.log('-----');
  console.log(hero.name + ' tried to move ' + direction);
  console.log(hero.name + ' owns ' + hero.mineCount + ' diamond mines')
  console.log(hero.name + ' has ' + hero.health + ' health')
  game.handleHeroTurn(direction);
}
console.log('Played ' + i + ' turns.');
for (var i in game.heroes) {
  var hero = game.heroes[i];
  console.log('======================');
  console.log('Hero: ', hero.name);
  console.log('Dead: ', hero.dead);
  console.log('Hp: ', hero.health);
  console.log('LastActive: ', hero.lastActiveTurn);
  console.log('Dead: ', hero.dead);
}
console.log(game.winningTeam);
console.log(Object.keys(game))
