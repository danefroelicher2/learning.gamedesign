// Main game initialization and game loop
class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.isRunning = false;
    this.lastTime = 0;
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
  }

  init() {
    console.log("Initializing Platformer Game...");

    // Initialize game systems
    this.setupCanvas();
    this.setupResizeHandler();

    // Start the game loop
    this.start();

    console.log("Game initialized successfully!");
  }

  setupCanvas() {
    // Make canvas fullscreen
    this.resizeCanvas();

    // Set up rendering context
    this.ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering

    // Update camera with new canvas size
    camera.canvas = this.canvas;
  }

  setupResizeHandler() {
    // Handle window resize
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      // Update camera with new size
      camera.canvas = this.canvas;
    });
  }

  resizeCanvas() {
    // Set canvas to full window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    console.log(
      `Canvas resized to: ${this.canvas.width}x${this.canvas.height}`
    );
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
  }

  gameLoop(currentTime = performance.now()) {
    if (!this.isRunning) return;

    // Calculate delta time
    const deltaTime = currentTime - this.lastTime;

    // Only update if enough time has passed (frame rate limiting)
    if (deltaTime >= this.frameInterval) {
      this.update(deltaTime);
      this.render();
      this.lastTime = currentTime;
    }

    // Continue the loop
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  update(deltaTime) {
    // Update game state
    gameStateManager.update();

    // Update player (only during gameplay)
    player.update(this.canvas);

    // Update level manager (includes mobs and projectiles)
    levelManager.update(deltaTime);
  }

  render() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render current game state
    gameStateManager.render(this.ctx, this.canvas);
  }
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.init();
});

// Global game instance for debugging
let gameInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  gameInstance = new Game();
  gameInstance.init();
});
