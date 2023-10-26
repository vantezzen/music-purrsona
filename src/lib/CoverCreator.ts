import p5 from "p5";

class CoverCreator {
  private p: p5;
  private img: p5.Image | null = null;

  constructor() {
    this.p = new p5(this.sketch);
  }

  private sketch(s: p5) {
    s.setup = () => {
      s.createCanvas(500, 500);
      s.pixelDensity(1);
      s.noLoop();
    };
  }

  public createCover(playlistName: string): string {
    this.drawBackground();
    this.drawImage();
    this.drawOverlayText(playlistName);
    return (this.p as any).canvas.toDataURL("image/jpeg");
  }

  private drawBackground(): void {
    this.p.background(255);
  }

  private drawImage(): void {
    if (this.img) {
      this.drawImageToFit(
        this.img,
        0,
        this.p.height / 4,
        this.p.width,
        (3 * this.p.height) / 4
      );
    }
  }

  private drawOverlayText(playlistName: string): void {
    this.p.fill(255);
    this.p.noStroke();
    this.p.rect(0, 0, this.p.width, this.p.height / 4);

    this.p.fill(0);
    this.p.textSize(20);
    this.p.textStyle(this.p.BOLD);
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.text("Music Purrsona", this.p.width / 2, this.p.height / 8 - 10);

    this.p.textSize(40);
    this.p.textStyle(this.p.BOLD);
    this.p.text(playlistName, this.p.width / 2, this.p.height / 8 + 30);
  }

  private drawImageToFit(
    img: p5.Image,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    const ar = img.width / img.height;
    let newW = w;
    let newH = w / ar;
    if (newH < h) {
      newH = h;
      newW = h * ar;
    }
    const offsetX = (newW - w) * 0.5;
    const offsetY = (newH - h) * 0.5;
    this.p.image(img, x - offsetX, y - offsetY, newW, newH);
  }

  public loadImageFromFile(inputElement: HTMLInputElement) {
    return new Promise<void>((resolve) => {
      const file = inputElement.files![0];
      console.log(file);
      if (file) {
        this.img = this.p.loadImage(
          URL.createObjectURL(file),
          () => resolve(),
          () => resolve()
        );
      }
    });
  }
}

export default CoverCreator;
