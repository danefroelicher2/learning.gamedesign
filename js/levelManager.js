// Level management system
class LevelManager {
  constructor() {
    this.currentLevelIndex = 0;
    this.currentLevel = null;
    this.mobs = []; // Track active mobs
  }

  startLevel(levelIndex) {
    if (levelIndex >= LEVELS.length) {
      console.log("No more levels!");
      return;
    }

    this.currentLevelIndex = levelIndex;
    this.currentLevel = LEVELS[levelIndex];

    // Clear any existing projectiles
    projectileManager.clearAll();

    // Initialize mobs for this level
    this.initializeMobs();

    // Calculate level bounds and set camera limits
    this.calculateLevelBounds();

    // Reset player to level start position
    player.setPosition(
      this.currentLevel.playerStart.x,
      this.currentLevel.playerStart.y
    );

    // Update UI
    this.updateUI();

    // Change to playing state
    gameStateManager.setState("playing");

    console.log(`Starting ${this.currentLevel.name}`);
  }

  initializeMobs() {
    this.mobs = [];

    if (!this.currentLevel.mobs) return;

    // Create mob instances from level data
    for (let mobData of this.currentLevel.mobs) {
      const mob = new Mob(
        mobData.x,
        mobData.y,
        mobData.type,
        mobData.config || {}
      );
      this.mobs.push(mob);
    }

    console.log(`Initialized ${this.mobs.length} mobs`);
  }

  calculateLevelBounds() {
    if (!this.currentLevel) return;

    // Find the rightmost and bottommost points in the level
    let maxX = 0;
    let maxY = 400; // Default height

    // Check platforms
    for (let platform of this.currentLevel.platforms) {
      maxX = Math.max(maxX, platform.x + platform.width);
      maxY = Math.max(maxY, platform.y + platform.height);
    }

    // Check goal
    if (this.currentLevel.goal) {
      maxX = Math.max(
        maxX,
        this.currentLevel.goal.x + this.currentLevel.goal.width
      );
    }

    // Set camera bounds
    camera.setLevelBounds(maxX, maxY);

    console.log(`Level bounds set: width=${maxX}, height=${maxY}`);
  }

  getCurrentLevel() {
    return this.currentLevel;
  }

  updateUI() {
    const levelDisplay = document.getElementById("levelDisplay");
    const gameInfo = document.getElementById("gameInfo");
    const controls = document.getElementById("controls");

    if (levelDisplay) levelDisplay.textContent = this.currentLevel.id;
    if (gameInfo)
      gameInfo.textContent = `Level: ${this.currentLevel.id} - ${this.currentLevel.name}`;
    if (controls)
      controls.textContent =
        "Use WASD or Arrow Keys to move and jump. Avoid the fireballs!";
  }

  update(deltaTime) {
    if (gameStateManager.currentState !== "playing") return;

    // Update camera
    camera.update();

    // Update mobs
    for (let mob of this.mobs) {
      mob.update(deltaTime);
    }

    // Update projectiles
    projectileManager.update();
  }

  render(ctx, canvas) {
    if (!this.currentLevel) return;

    this.drawBackground(ctx, canvas);
    this.drawPlatforms(ctx);
    this.drawGoal(ctx);
    this.drawMobs(ctx);
    this.drawProjectiles(ctx);

    // Future: this.drawCollectibles(ctx);
  }

  drawBackground(ctx, canvas) {
    const bg = this.currentLevel.background;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, bg.color1);
    gradient.addColorStop(1, bg.color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawPlatforms(ctx) {
    // Different platform types could have different colors/textures
    for (let platform of this.currentLevel.platforms) {
      if (platform.type === "ground") {
        ctx.fillStyle = "#8B4513"; // Brown for ground
      } else {
        ctx.fillStyle = "#CD853F"; // Sandy brown for platforms
      }

      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

      // Add a simple border for visual appeal
      ctx.strokeStyle = "#654321";
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }
  }

  drawGoal(ctx) {
    const goal = this.currentLevel.goal;

    // Draw flag
    ctx.fillStyle = "#2ecc71"; // Green flag
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    // Draw flagpole
    ctx.fillStyle = "#34495e"; // Dark gray pole
    ctx.fillRect(goal.x + goal.width / 2 - 2, goal.y, 4, goal.height + 20);

    // Add pole base
    ctx.fillRect(goal.x + goal.width / 2 - 6, goal.y + goal.height + 16, 12, 4);
  }

  drawMobs(ctx) {
    for (let mob of this.mobs) {
      mob.render(ctx);
    }
  }

  drawProjectiles(ctx) {
    projectileManager.render(ctx);
  }

  // Future expansion methods
  drawCollectibles(ctx) {
    // Will implement when we add coins, power-ups, etc.
    for (let collectible of this.currentLevel.collectibles) {
      // Draw collectible based on type
    }
  }
}

// Global level manager instance
const levelManager = new LevelManager();
