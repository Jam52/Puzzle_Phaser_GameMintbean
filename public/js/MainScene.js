import Tile from './Tile.js';

// Create a MainScene, preload all images, set background
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('background', '../assets/Puzzle_dirt.png');
    this.load.image('bomb', './assets/Puzzle_Bomb.jpg');
    this.load.image('emptyTile', './assets/Puzzle_Uncovered.jpg');
    this.load.image('hiddenTile', './assets/Puzzle_Hidden.jpg');
    this.load.image('startTile', './assets/Puzzle_Start.jpg');
    this.load.image('endTile', './assets/Puzzle_End.jpg');
  }

  create() {
    // Set Background position
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = this.sys.game.config.width;

    const tileSize = 35;

    let startingX = (this.sys.game.config.width - tileSize * 12) / 2;
    let startingY = (this.sys.game.config.height - tileSize * 8) / 2;
    let endingX = this.sys.game.config.width - startingX - tileSize;

    // let startingTile = this.add.sprite(startingX, 50, 'startTile');
    // startingTile.displayWidth = tileSize;
    // startingTile.displayHeight = tileSize;

    let tile = new Tile({
      scene: this,
      x: 50,
      y: 50,
      hidden: 'hiddenTile',
      clickedImage: 'emptyTile',
      tileSize,
      finishLevel,
    });

    // for (let Xindex = 0; Xindex < 8; Xindex++) {
    //   const newStartingX = startingX + tileSize * Xindex;
    //   for (let Yindex = 0; Yindex < 8; Yindex++) {
    //     let tile = new Tile({
    //       scene: this,
    //       x: newStartingX,
    //       y: startingY + Yindex * tileSize,
    //       hidden: 'hiddenTile',
    //       clickedImage: 'emptyTile',
    //       tileSize,
    //       finishLevel,
    //     });
    //   }
    // }
  }

  update() {}
}

const finishLevel = function () {
  console.log('finish');
};
