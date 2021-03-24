import Tile from './Tile.js';

// Create a MainScene, preload all images, set background
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.clickable = true;
    this.setClickable = this.setClickable.bind(this);
    this.getClickable = this.getClickable.bind(this);
  }

  setClickable = function (isClickable) {
    this.clickable = isClickable;
  };

  getClickable = function () {
    return this.clickable;
  };

  preload() {
    this.load.image('background', '../assets/Puzzle_dirt.png');
    this.load.image('bomb', './assets/Puzzle_Bomb.jpg');
    this.load.image('emptyTile', './assets/Puzzle_Uncovered.jpg');
    this.load.image('hiddenTile', './assets/Puzzle_Hidden.jpg');
    this.load.image('startTile', './assets/Puzzle_Start.jpg');
    this.load.image('endTile', './assets/Puzzle_End.jpg');
    this.load.image('fail', './assets/fail_game.jpg');
  }

  create() {
    const finishLevel = (scene) => {
      scene.add.sprite(100, 100, 'fail');
      this.setClickable(false);
      console.log(this);
    };
    // Set Background position
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = this.sys.game.config.width;

    let tileSize = 35;
    let startingX = (this.sys.game.config.width - tileSize * 12) / 2;
    let startingY = (this.sys.game.config.height - tileSize * 8) / 2;
    let endingX = this.sys.game.config.width - startingX - tileSize;

    let tileObjectData = {
      scene: this,
      hidden: 'hiddenTile',
      bottomImage: 'emptyTile',
      tileSize: tileSize,
      finishLevel,
      clickable: this.getClickable,
    };
    this.tileObjectData = tileObjectData;

    for (let Xindex = 0; Xindex < 12; Xindex++) {
      const x = startingX + tileSize * Xindex;
      for (let Yindex = 0; Yindex < 8; Yindex++) {
        const y = startingY + Yindex * tileSize;
        let tile = new Tile(tileObjectData, x, y);
      }
    }
  }

  update() {}
}
