export class Enemy {
  public x: number;
  public y: number;
  public color: string;
  public radius: number;
  private angle = 0;
  private angleSpeed = Math.random() * 0.1 + 0.05;
  private amplitude = Math.random() * 50 + 50;
  private initialX: number;

  constructor(x: number, y: number) {
    this.initialX = x;
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.color = "#f00";
  }

  public update() {
    this.y += 2;
    this.x = this.initialX + Math.sin(this.angle) * this.amplitude;
    this.angle += this.angleSpeed;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}
