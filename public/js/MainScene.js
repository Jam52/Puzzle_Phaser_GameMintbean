import Tile from './Tile.js';

// Create a MainScene, preload all images, set background
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.clickable = true;
    this.gameData = {};
    this.numOfMines = 20;
  }

  setClickable = (isClickable) => {
    this.clickable = isClickable;
  };

  getClickable = () => {
    return this.clickable;
  };

  setNumOfMines = (newNumOfMines) => {
    this.numOfMines = newNumOfMines;
  };

  initilizeGameData = (numOfMines = 20) => {
    console.log('initilizing');

    //specifiy index's where bombs cannot be placed
    const bombIndexNotAllowed = [
      [0, 1],
      [1, 0],
      [1, 1],
      [10, 6],
      [10, 7],
      [11, 6],
    ];

    //build gameData object
    for (let x = 0; x < 12; x++) {
      let yIndexArray = [];
      for (let y = 0; y < 8; y++) {
        if (x === 0 && y === 0) {
          yIndexArray.push({ xIndex: x, yIndex: y, baseImage: 'startTile' });
        } else if (x === 11 && y === 7) {
          yIndexArray.push({ xIndex: x, yIndex: y, baseImage: 'endTile' });
        } else if (
          bombIndexNotAllowed.some((index) => index[0] === x && index[1] === y)
        ) {
          yIndexArray.push({ xIndex: x, yIndex: y, baseImage: 'emptyTile' });
        } else {
          const isBomb = Math.random() < numOfMines / 88;

          let baseImage = 'emptyTile';
          if (isBomb) {
            baseImage = 'bomb';
          }
          yIndexArray.push({ xIndex: x, yIndex: y, baseImage });
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
    let tileSize = 40;
    this.initilizeGameData(this.numOfMines);

    const finishLevel = (scene) => {
      let endButton = scene.add.sprite(sceneWidth / 2, sceneHeight / 2, 'fail');
      endButton
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
          console.log(this);
          console.log('end clicked');
          this.scene.setNumOfMines(this.numOfMines + 5);
          this.scene.initilizeGameData(this.numOfMines);
          startGame();
          console.log(this.scene.gameData);
        });
      this.setClickable(false);
      console.log(this);
    };

    const sceneWidth = this.sys.game.config.width;
    const sceneHeight = this.sys.game.config.height;

    let startingX = (sceneWidth - tileSize * 12 + tileSize) / 2;
    let startingY = (sceneHeight - tileSize * 8 + tileSize) / 2;

    // Set Background position
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = sceneWidth;

    let tileObjectData = {
      hidden: 'hiddenTile',
      tileSize: tileSize,
      finishLevel,
      clickable: this.getClickable,
    };

    //populate the gameboard with tiles
    const startGame = () => {
      this.setClickable(true);
      for (let Xindex = 0; Xindex < 12; Xindex++) {
        const x = startingX + tileSize * Xindex;
        for (let Yindex = 0; Yindex < 8; Yindex++) {
          const y = startingY + Yindex * tileSize;
          console.log(this.gameData[Xindex][Yindex]);
          let tile = new Tile(
            this,
            { ...this.gameData[Xindex][Yindex], ...tileObjectData },
            x,
            y,
            tileSize,
          );
        }
      }
    };

    startGame();
  }

  update() {}
}
