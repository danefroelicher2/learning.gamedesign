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

    console.log("Starting level:", this.currentLevel);

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

    console.log("Current level mobs:", this.currentLevel.mobs);

    if (!this.currentLevel || !this.currentLevel.mobs) {
      console.log("No mobs defined for this level");
      return;
    }

    // Create mob instances from level data
    for (let mobData of this.currentLevel.mobs) {
      console.log("Creating mob with data:", mobData);
      const mob = new Mob(
        mobData.x,
        mobData.y,
        mobData.type,
        mobData.config || {}
      );
      this.mobs.push(mob);
    }

    console.log(`Successfully initialized ${this.mobs.length} mobs`);
  }

  calculateLevelBounds() {
    if (!this.currentLevel) return;

    // Find the rightmost and bottommost points in the level
    let maxX = 800; // Minimum level width
    let maxY = 400; // Default height

    // Check platforms
    for (let platform of this.currentLevel.platforms) {
      maxX = Math.max(maxX, platform.x + platform.width + 100); // Add padding
      maxY = Math.max(maxY, platform.y + platform.height);
    }

    // Check goal
    if (this.currentLevel.goal) {
      maxX = Math.max(
        maxX,
        this.currentLevel.goal.x + this.currentLevel.goal.width + 100
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
    // Update level header in top-left
    deathCounter.updateLevelHeader(this.currentLevel.name);

    // Update controls
    const controls = document.getElementById("controls");
    if (controls) {
      controls.textContent =
        "WASD/Arrow Keys: Move & Jump | Avoid fireballs and cannoneers!";
    }
  }

  update(deltaTime) {
    if (gameStateManager.currentState !== "playing") return;

    // Update camera
    camera.update();

    // Update mobs
    for (let mob of this.mobs) {
      if (mob && mob.update) {
        mob.update(deltaTime);
      }
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
  }

  drawBackground(ctx, canvas) {
    const bg = this.currentLevel.background;

    // Calculate the actual level width from platforms and goal
    let levelWidth = canvas.width; // Use full canvas width as minimum

    for (let platform of this.currentLevel.platforms) {
      levelWidth = Math.max(levelWidth, platform.x + platform.width);
    }

    if (this.currentLevel.goal) {
      levelWidth = Math.max(
        levelWidth,
        this.currentLevel.goal.x + this.currentLevel.goal.width
      );
    }

    // Add extra padding to ensure full coverage
    levelWidth += 200;

    // Create gradient that spans the entire level
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, bg.color1);
    gradient.addColorStop(1, bg.color2);
    ctx.fillStyle = gradient;

    // Draw background across the entire level width
    ctx.fillRect(0, 0, levelWidth, canvas.height);
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
      if (mob && mob.render) {
        mob.render(ctx);
      }
    }
  }

  drawProjectiles(ctx) {
    projectileManager.render(ctx);
  }
}

// Global level manager instance
const levelManager = new LevelManager();
