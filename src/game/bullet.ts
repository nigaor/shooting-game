export class Bullet {
  public x: number;
  public y: number;
  public radius: number;
  private color: string;
  private velocity: { x: number; y: number };

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.color = "#fff";
    this.velocity = { x: 0, y: -5 };
  }

  public update() {
    this.y += this.velocity.y;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}
