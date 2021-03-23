export default class Tile extends Phaser.GameObjects.Container {
  constructor(config) {
    const { scene, x, y, hidden, tileSize, clickedImage, finishLevel } = config;
    let image = new Phaser.GameObjects.Sprite(scene, 0, 0, hidden);
    super(scene, x, y, image);
    this.image = image;
    this.scene = scene;
    this.tileSize = tileSize;
    this.finishLevel = finishLevel;
    this.clickedImage = clickedImage;
    this.image.displayWidth = tileSize;
    this.image.displayHeight = tileSize;
    this.scene.input.on('pointerup', this.tileClick.bind(this));
    scene.add.existing(this);
  }

  tileClick(event) {
    console.log(event);
    const { downX, downY } = event;
    const tileXValues = [
      this.x - this.tileSize / 2,
      this.x + this.tileSize / 2,
    ];
    const tileYValues = [
      this.y - this.tileSize / 2,
      this.y + this.tileSize / 2,
    ];
    console.log(tileXValues, downX);
    if (
      downX > tileXValues[0] &&
      downX < tileXValues[1] &&
      downY > tileYValues[0] &&
      downY < tileYValues[1]
    ) {
      console.log('clicked');
      this.finishLevel();
      this.image.setTexture(this.clickedImage);
    }
  }
}
