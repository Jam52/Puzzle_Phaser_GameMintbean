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
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage: 'startTile',
            number: 0,
          });
        } else if (x === 11 && y === 7) {
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage: 'endTile',
            number: 0,
          });
        } else if (
          bombIndexNotAllowed.some((index) => index[0] === x && index[1] === y)
        ) {
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage: 'emptyTile',
            number: 0,
          });
        } else {
          const isBomb = Math.random() < numOfMines / 88;

          let baseImage = 'emptyTile';
          if (isBomb) {
            baseImage = 'bomb';
          }
          yIndexArray.push({ xIndex: x, yIndex: y, baseImage, number: 0 });
        }
      }
      this.gameData[x] = yIndexArray;
    }

    //add number to the gameData surrounding the mines
    Object.keys(this.gameData).map((xIndex) => {
      this.gameData[xIndex].map((tileData) => {
        if (tileData.baseImage === 'bomb') {
          const { xIndex, yIndex } = tileData;
          if (xIndex > 0) {
            this.gameData[xIndex - 1][yIndex].number += 1;
          }
          if (xIndex < 11) {
            this.gameData[xIndex + 1][yIndex].number += 1;
          }
          if (yIndex > 0) {
            this.gameData[xIndex][yIndex - 1].number += 1;
          }
          if (yIndex < 7) {
            this.gameData[xIndex][yIndex + 1].number += 1;
          }
          if (xIndex > 0 && yIndex > 0) {
            this.gameData[xIndex - 1][yIndex - 1].number += 1;
          }
          if (xIndex > 0 && yIndex < 7) {
            this.gameData[xIndex - 1][yIndex + 1].number += 1;
          }
          if (xIndex < 11 && yIndex > 0) {
            this.gameData[xIndex + 1][yIndex - 1].number += 1;
          }
          if (xIndex < 11 && yIndex < 7) {
            this.gameData[xIndex + 1][yIndex + 1].number += 1;
          }
        }
      });
    });

    console.log(this.gameData);
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
    let tileSize = 38;
    this.initilizeGameData(this.numOfMines);

    const finishLevel = (scene) => {
      let endButton = scene.add.sprite(sceneWidth / 2, sceneHeight / 2, 'fail');
      endButton
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
          console.log('end clicked');
          this.scene.initilizeGameData(this.numOfMines);
          startGame();
        });
      this.setClickable(false);
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
          let tile = new Tile(
            this,
            { ...this.gameData[Xindex][Yindex], ...tileObjectData },
            x,
            y,
            this.gameData,
          );
        }
      }
    };

    startGame();
  }

  update() {}
}
