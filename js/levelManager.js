// Level management system
class LevelManager {
  constructor() {
    this.currentLevelIndex = 0;
    this.currentLevel = null;
    this.mobs = []; // Track active mobs
    this.bossDefeated = false;
  }

  startLevel(levelIndex) {
    if (levelIndex >= LEVELS.length) {
      console.log("No more levels!");
      return;
    }

    this.currentLevelIndex = levelIndex;
    this.currentLevel = LEVELS[levelIndex];
    this.bossDefeated = false;

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
        "WASD/Arrow Keys: Move & Jump | Jump on boss head to defeat it!";
    }
  }

  update(deltaTime) {
    if (gameStateManager.currentState !== "playing") return;

    // Check for boss arena trigger
    this.checkBossArenaTrigger();

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

  checkBossArenaTrigger() {
    if (!this.currentLevel.bossArena) return;
    if (this.currentLevel.bossArena.triggered) return;

    const arena = this.currentLevel.bossArena;
    const playerX = player.x + player.width / 2;

    // Check if player entered boss arena
    if (playerX >= arena.x && playerX <= arena.x + arena.width) {
      console.log("Player entered boss arena! Locking camera...");

      // Mark as triggered
      this.currentLevel.bossArena.triggered = true;

      // Lock camera to boss arena - make it full screen width
      camera.lockToBossArena(arena.x, arena.width);

      // Update UI for boss fight
      deathCounter.updateLevelHeader(this.currentLevel.name + " - BOSS FIGHT");
    }
  }

  onBossDefeated() {
    console.log("Boss defeated! Unlocking camera...");

    this.bossDefeated = true;

    // Unlock camera
    camera.unlockFromBossArena();

    // Update UI
    deathCounter.updateLevelHeader(this.currentLevel.name + " - Victory!");

    // Show victory message briefly
    setTimeout(() => {
      deathCounter.updateLevelHeader(this.currentLevel.name);
    }, 3000);
  }

  render(ctx, canvas) {
    if (!this.currentLevel) return;

    this.drawBackground(ctx, canvas);
    this.drawPlatforms(ctx);
    this.drawGoal(ctx);
    this.drawMobs(ctx);
    this.drawProjectiles(ctx);
    this.drawBossArenaIndicators(ctx, canvas); // Pass canvas for screen width
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
      } else if (platform.type === "wall") {
        ctx.fillStyle = "#2c3e50"; // Dark blue-gray for walls
      } else {
        ctx.fillStyle = "#CD853F"; // Sandy brown for platforms
      }

      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

      // Add a simple border for visual appeal
      ctx.strokeStyle = platform.type === "wall" ? "#34495e" : "#654321";
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }
  }

  drawBossArenaIndicators(ctx, canvas) {
    // Only draw boss arena label - NO RED BARS
    if (
      this.currentLevel.bossArena &&
      this.currentLevel.bossArena.triggered &&
      !this.bossDefeated
    ) {
      const arena = this.currentLevel.bossArena;

      // Only show boss arena label in the sky - no boundary markers
      ctx.fillStyle = "#e74c3c";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("⚔️ BOSS ARENA ⚔️", canvas.width / 2, 100); // Center of screen
      ctx.textAlign = "left";
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
