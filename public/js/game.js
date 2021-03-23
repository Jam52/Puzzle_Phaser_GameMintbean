import MainScene from './MainScene.js';

let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not then will use Canvas
  width: 640,
  height: 360,
  scene: [MainScene],
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);


///////////////////////////


// // create a new scene
// let gameScene = new Phaser.Scene('Game');

// // load assets
// // gameScene.preload = function(){
// //     // load images
// //     //this.load.image('background', 'assests/background.png');
// //     //this.load.image('player', 'assests/player.png');
// // };

// // // called once after the preload ends
// // gameScene.create = function() {
// //     // create bg sprite
// //     let bg = this.add.sprite(0,0,'background');

// //     // change the origin to the top-left corner
// //     bg.setOrigin(0,0);
// // };
// // set the configuration of the game
// let config = {
//     type: Phaser.AUTO, // Phaser will use WebGL if available, if not then will use Canvas
//     width: 640,
//     height: 360,
//     scene: gameScene
// }

// // create a new game, pass the configuration
// let game = new Phaser.Game(config);