export default class Tile extends Phaser.GameObjects.Container {
  constructor(scene, data, x, y, gameData) {
    const {
      tileSize,
      baseImage,
      getIsGamePlaying,
      hidden,
      xIndex,
      yIndex,
      setLives,
      getLives,
      winLevel,
      loseLevel,
      setSurroundingTilesToClickable,
    } = data;
    let image = new Phaser.GameObjects.Sprite(scene, 0, 0, baseImage);
    let numberText = new Phaser.GameObjects.Text(
      scene,
      -8,
      -12,
      gameData[xIndex][yIndex].number === 0 || baseImage === 'bomb'
        ? null
        : gameData[xIndex][yIndex].number,
      { color: '#000', fontSize: '25px', fontStyle: 'bold' },
    );
    let topImage = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      baseImage === 'startTile' || baseImage === 'endTile' ? baseImage : hidden,
    );

    super(scene, x, y, [image, numberText, topImage]);
    this.baseImage = baseImage;
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.image = image;
    this.number = gameData[xIndex][yIndex].number;
    this.numberText = numberText;
    this.numberText.style.color = '#000';
    this.tileData = gameData[xIndex][yIndex];
    this.scene = scene;
    this.tileSize = tileSize;
    this.image.displayWidth = tileSize;
    this.image.displayHeight = tileSize;
    this.topImage = topImage;
    this.topImage.displayWidth = tileSize;
    this.topImage.displayHeight = tileSize;
    this.setSurroundingTilesToClickable = setSurroundingTilesToClickable;
    this.isTileClickable = false;
    this.isClicked =
      baseImage === 'startTile' || baseImage === 'endTile' ? true : false;
    this.getIsGamePlaying = getIsGamePlaying;
    this.setLives = setLives;
    this.getLives = getLives;
    this.winLevel = winLevel;
    this.loseLevel = loseLevel;
    this.isFlagTile = false;
    scene.add.existing(this);
  }

  setTileClickable = () => {
    if (this.isClicked !== true && !this.isFlagTile) {
      this.topImage.setTexture('hiddenTileClickable');
      this.isTileClickable = true;
    }
  };

  getXIndex = () => {
    return this.xIndex;
  };
  getYIndex = () => {
    return this.yIndex;
  };

  clickTile = () => {
    if (this.getIsGamePlaying()) {
      if (this.isTileClickable) {
        this.topImage.setVisible(false);
        this.isClicked = true;
        this.setSurroundingTilesToClickable(this.tileData);
      }
      if (this.baseImage === 'bomb') {
        const lives = this.getLives();
        if (lives === 1) {
          this.loseLevel(this.scene);
        }
        this.setLives(lives - 1);
      }
      if (this.baseImage === 'endTile') {
        this.winLevel(this.scene);
      }
    }
  };

  getNumber = () => {
    return this.number;
  };

  toggleFlagTile = () => {
    console.log('toggle');
    if (!this.isFlagTile) {
      this.topImage.setTexture('flagTile');
      this.isTileClickable = false;
      this.isFlagTile = true;
    } else {
      this.isFlagTile = false;
      this.isTileClickable = true;
      this.topImage.setTexture('hiddenTileClickable');
    }
  };
}
