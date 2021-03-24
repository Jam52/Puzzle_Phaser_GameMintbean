export default class Tile extends Phaser.GameObjects.Container {
  constructor(scene, data, x, y) {
    const { tileSize, baseImage, finishLevel, clickable, hidden } = data;
    let image = new Phaser.GameObjects.Sprite(scene, 0, 0, baseImage);
    let topImage = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      baseImage === 'startTile' || baseImage === 'endTile' ? baseImage : hidden,
    );
    super(scene, x, y, [image, topImage]);
    this.image = image;
    this.topImage = topImage;
    this.scene = scene;
    this.tileSize = tileSize;
    this.finishLevel = finishLevel;
    this.image.displayWidth = tileSize;
    this.image.displayHeight = tileSize;
    this.topImage.displayWidth = tileSize;
    this.topImage.displayHeight = tileSize;
    this.topImage
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
        if (clickable()) {
          topImage.setVisible(false);
        }
        if (baseImage === 'bomb') {
          finishLevel(this.scene);
        }
      });
    scene.add.existing(this);
  }

  tileClick = function (event) {
    console.log(event);
    this.topImage.setVisible(false);

    this.finishLevel(this.scene);
    this.setClickable(false);
    this.image.setTexture(this.clickedImage);
  };
}
