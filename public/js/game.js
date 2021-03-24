import MainScene from './MainScene.js';

let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not then will use Canvas
  width: 640,
  height: 360,
  
  scene: [MainScene],
  autoCenter: Phaser.Scale.CENTER_BOTH,
  
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

