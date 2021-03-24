export default class Tile extends Phaser.GameObjects.Container {
  constructor(data, x, y) {
    const {
      scene,
      hidden,
      tileSize,
      bottomImage,
      finishLevel,
      clickable,
    } = data;

    let image = new Phaser.GameObjects.Sprite(scene, 0, 0, bottomImage);
    let topImage = new Phaser.GameObjects.Sprite(scene, 0, 0, hidden);
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
    this.tileClick = this.tileClick;
    this.topImage
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (event) {
        if (clickable()) {
          topImage.setVisible(false);
        }
        if (bottomImage !== 'bomb') {
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
