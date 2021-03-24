import Tile from './Tile.js';

// Create a MainScene, preload all images, set background
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.clickable = true;
    this.setClickable = this.setClickable;
    this.getClickable = this.getClickable;
    this.gameData = {};
    this.initilizeGameData = this.initilizeGameData;
  }

  setClickable = (isClickable) => {
    this.clickable = isClickable;
  };

  getClickable = () => {
    return this.clickable;
  };

  initilizeGameData = () => {
    console.log('initilizing');
    for (let x = 0; x < 12; x++) {
      let yIndexArray = [];
      for (let y = 0; y < 8; y++) {
        if (x === 0 && y === 0) {
          yIndexArray.push({ xIndex: x, yIndex: y, image: 'startTile' });
        } else if (x === 11 && y === 7) {
          yIndexArray.push({ xIndex: x, yIndex: y, image: 'endTile' });
        } else {
          yIndexArray.push({ xIndex: x, yIndex: y, image: 'emptyTile' });
        }
      }
      this.gameData[x] = yIndexArray;
    }
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
    this.initilizeGameData();
    console.log(this.gameData);

    const sceneWidth = this.sys.game.config.width;
    const sceneHeight = this.sys.game.config.height;

    const finishLevel = (scene) => {
      scene.add.sprite(sceneWidth / 2, sceneHeight / 2, 'fail');
      this.setClickable(false);
      console.log(this);
    };

    // Set Background position
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = sceneWidth;

    let tileSize = 35;
    let startingX = (sceneWidth - tileSize * 12) / 2;
    let startingY = (sceneHeight - tileSize * 8) / 2;
    let endingX = sceneWidth - startingX - tileSize;

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
