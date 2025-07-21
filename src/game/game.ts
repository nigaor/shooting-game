import { STAGE_WIDTH, STAGE_HEIGHT } from "./config";
import { Player } from "./player";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import { Particle } from "./particle";

export class Game {
  private context: CanvasRenderingContext2D;
  private player: Player;
  private bullets: Bullet[] = [];
  private enemies: Enemy[] = [];
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private enemyTimer = 0;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.player = new Player(STAGE_WIDTH / 2, STAGE_HEIGHT - 30);

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });

    window.addEventListener("click", () => {
      this.bullets.push(new Bullet(this.player.x, this.player.y));
    });
  }

  public update() {
    this.player.update(this.mouse.x, this.mouse.y);

    this.particles.forEach((particle, index) => {
      if (particle.isFinished()) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });

    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.update();

      this.enemies.forEach((enemy, enemyIndex) => {
        const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
        if (dist - enemy.radius - bullet.radius < 1) {
          for (let i = 0; i < enemy.radius * 2; i++) {
            this.particles.push(
              new Particle(bullet.x, bullet.y, enemy.color)
            );
          }
          this.bullets.splice(bulletIndex, 1);
          this.enemies.splice(enemyIndex, 1);
        }
      });
    });

    this.enemies.forEach((enemy) => enemy.update());

    if (this.enemyTimer % 60 === 0) {
      const x = Math.random() * STAGE_WIDTH;
      this.enemies.push(new Enemy(x, 0));
    }
    this.enemyTimer++;
  }

  public draw() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    this.player.draw(this.context);

    this.particles.forEach((particle) => particle.draw(this.context));
    this.bullets.forEach((bullet) => bullet.draw(this.context));
    this.enemies.forEach((enemy) => enemy.draw(this.context));
  }

  public run() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.run());
  }
}
