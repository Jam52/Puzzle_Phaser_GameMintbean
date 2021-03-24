import Tile from './Tile.js';

// Create a MainScene, preload all images, set background
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.isGamePlaying = true;
    this.gameData = {};
    this.numOfMines = 10;
    this.currentLevel = 1;
  }

  //setter for isGamePlaying set to true on new level or start again
  setIsGamePlaying = (isGamePlaying) => {
    this.isGamePlaying = isGamePlaying;
  };

  // getter to see if the game is currenty playing
  getIsGamePlaying = () => {
    return this.isGamePlaying;
  };
  // setter for numOfMines
  setNumOfMines = (newNumOfMines) => {
    this.numOfMines = newNumOfMines;
  };

  setTileClickable = (tileData) => {
    this.surroundingTiles(tileData, 'isTileClickable', true);
  };

  upCurrentLevelByOne = () => {
    this.currentLevel += 1;
  };

  /* 
  A function to build the gameData the gameTiles will be created from
  The data is an object where 
   - keys are a reference to the xIndex for the tiles possition
   - each key has an array of objects whoes index is the yIndex for the tile possition
   - the objects in the array contain the gameData for each tile.
  */
  initilizeGameData = () => {
    this.gameData = {};
    console.log('initilizing');
    const numOfMines = this.numOfMines;
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
            isTileClickable: false,
          });
        } else if (x === 11 && y === 7) {
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage: 'endTile',
            number: 0,
            isTileClickable: false,
          });
        } else if (
          bombIndexNotAllowed.some((index) => index[0] === x && index[1] === y)
        ) {
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage: 'emptyTile',
            number: 0,
            isTileClickable: false,
          });
        } else {
          const isBomb = Math.random() < numOfMines / 88;

          let baseImage = 'emptyTile';
          if (isBomb) {
            baseImage = 'bomb';
          }
          yIndexArray.push({
            xIndex: x,
            yIndex: y,
            baseImage,
            number: 0,
            isTileClickable: false,
          });
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

    //set first three tiles to clickable
    this.gameData[0][1].isTileClickable = true;
    this.gameData[1][1].isTileClickable = true;
    this.gameData[1][0].isTileClickable = true;
  };

  surroundingTiles = (tileData, key, result) => {
    const { xIndex, yIndex } = tileData;
    if (xIndex > 0) {
      this.gameData[xIndex - 1][yIndex][key] = result;
    }
    if (xIndex < 11) {
      this.gameData[xIndex + 1][yIndex][key] = result;
    }
    if (yIndex > 0) {
      this.gameData[xIndex][yIndex - 1][key] = result;
    }
    if (yIndex < 7) {
      this.gameData[xIndex][yIndex + 1][key] = result;
    }
    if (xIndex > 0 && yIndex > 0) {
      this.gameData[xIndex - 1][yIndex - 1][key] = result;
    }
    if (xIndex > 0 && yIndex < 7) {
      this.gameData[xIndex - 1][yIndex + 1][key] = result;
    }
    if (xIndex < 11 && yIndex > 0) {
      this.gameData[xIndex + 1][yIndex - 1][key] = result;
    }
    if (xIndex < 11 && yIndex < 7) {
      this.gameData[xIndex + 1][yIndex + 1][key] = result;
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
    this.load.image('win', './assets/win_game.jpg');
  }

  create() {
    let tileSize = 38;
    this.initilizeGameData();

    /* function called when game is lost, sets the isGameplaying to false to stop tiles from 
    being able to the clicked when clicked re-initializes and restarts the game.
    */
    const loseLevel = (scene) => {
      let endButton = scene.add.sprite(sceneWidth / 2, sceneHeight / 2, 'fail');
      endButton
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
          console.log('bomb clicked');
          this.scene.initilizeGameData();
          startGame();
        });
      this.setIsGamePlaying(false);
    };

    /* function called when game is won, sets the isGameplaying to false to stop tiles from 
    being able to the clicked, when clicked increases the current level by one and re-initializes and restarts the game.
    */
    const winLevel = (scene) => {
      let endButton = scene.add.sprite(sceneWidth / 2, sceneHeight / 2, 'win');
      endButton
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
          console.log('end clicked');
          this.scene.setNumOfMines(this.numOfMines + 5);
          this.scene.initilizeGameData();
          this.scene.upCurrentLevelByOne();
          startGame();
        });
      this.setIsGamePlaying(false);
    };

    const sceneWidth = this.sys.game.config.width;
    const sceneHeight = this.sys.game.config.height;

    let startingX = (sceneWidth - tileSize * 12 + tileSize) / 2;
    let startingY = 60;

    // Set Background position
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = sceneWidth;

    let level = this.add.text(
      sceneWidth - startingX + 18,
      10,
      'level:' + this.currentLevel,
      {
        fontSize: '20px',
      },
    );

    let tileObjectData = {
      hidden: 'hiddenTile',
      tileSize: tileSize,
      loseLevel,
      winLevel,
      getIsGamePlaying: this.getIsGamePlaying,
      setTileClickable: this.setTileClickable,
    };

    //populate the gameboard with tiles
    const startGame = () => {
      console.log(this.gameData);
      level.setText(`Level: ${this.currentLevel}`);
      level.displayOriginX = level.displayWidth;
      console.log(level);
      this.setIsGamePlaying(true);
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
