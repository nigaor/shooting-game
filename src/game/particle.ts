export class Particle {
  private x: number;
  private y: number;
  private radius: number;
  private color: string;
  private velocity: { x: number; y: number };
  private alpha: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * (Math.random() * 6),
      y: (Math.random() - 0.5) * (Math.random() * 6),
    };
    this.alpha = 1;
  }

  public update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.02;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  public isFinished(): boolean {
    return this.alpha <= 0;
  }
}
