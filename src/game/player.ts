export class Player {
  public x: number;
  public y: number;
  private radius: number;
  private color: string;
  private speed = 0.1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "#fff";
  }

  public update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}
