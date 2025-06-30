// Player class handles all player-related functionality
class Player {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.speed = 5; // Reduced speed for better control
    this.jumpPower = 15; // Kept original jump power (perfect height)
    this.gravity = 0.8; // Restored original gravity
    this.friction = 0.85; // Restored original friction
    this.color = "#e74c3c";

    // Death and respawn mechanics
    this.isDead = false;
    this.deathTime = 0;
    this.respawnDelay = 1500; // 1.5 seconds

    this.reset();
  }

  reset() {
    this.x = 50;
    this.y = 200;
    this.velocityX = 0;
    this.velocityY = 0;
    this.onGround = false;
    this.isDead = false;
    this.deathTime = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.onGround = false;
    this.isDead = false;
    this.deathTime = 0;
  }

  die() {
    if (this.isDead) return; // Already dead

    this.isDead = true;
    this.deathTime = Date.now();
    this.velocityX = 0;
    this.velocityY = 0;

    // Add to death counter
    deathCounter.addDeath();

    console.log("Player died!");
  }

  update(canvas) {
    if (gameStateManager.currentState !== "playing") return;

    // Handle death state
    if (this.isDead) {
      this.updateDeath();
      return;
    }

    this.handleInput();
    this.applyPhysics();
    this.handleCollisions();
    this.checkCannoneerCollisions();
    this.checkBossJumpAttack();
    this.checkBossArenaBounds(canvas);
    this.checkCheckpoints(); // ENHANCED: Check for multiple checkpoints
    this.checkBounds();
    this.checkFallReset();
    this.checkGoalReached();
  }

  updateDeath() {
    // Check if it's time to respawn
    if (Date.now() - this.deathTime > this.respawnDelay) {
      this.respawn();
    }
  }

  respawn() {
    const level = levelManager.getCurrentLevel();
    if (!level) return;

    // ENHANCED: Multi-checkpoint respawn priority: Boss Arena > Checkpoint 5 > Checkpoint 4 > Checkpoint 3 > Checkpoint 2 > Checkpoint 1 > Level Start
    if (
      level.bossArena &&
      level.bossArena.triggered &&
      !levelManager.bossDefeated
    ) {
      // Respawn at boss arena entrance (if in boss fight)
      this.setPosition(level.bossArena.respawnX, level.bossArena.respawnY);
      levelManager.resetProgressOnRespawn("bossArena");
      console.log("Player respawned at boss arena!");
    } else if (level.checkpoint5Reached) {
      // Respawn at checkpoint 5 (after spike gauntlet)
      this.setPosition(8300, 970);
      levelManager.resetProgressOnRespawn("checkpoint5");
      console.log("Player respawned at checkpoint 5!");
    } else if (level.checkpoint4Reached) {
      // Respawn at checkpoint 4 (after descent)
      this.setPosition(6500, 1000);
      levelManager.resetProgressOnRespawn("checkpoint4");
      console.log("Player respawned at checkpoint 4!");
    } else if (level.checkpoint3Reached) {
      // Respawn at checkpoint 3 (after spike introduction)
      this.setPosition(3600, 300);
      levelManager.resetProgressOnRespawn("checkpoint3");
      console.log("Player respawned at checkpoint 3!");
    } else if (level.checkpoint2Reached) {
      // Respawn at checkpoint 2 (after precision gauntlet)
      this.setPosition(2750, 300);
      levelManager.resetProgressOnRespawn("checkpoint2");
      console.log("Player respawned at checkpoint 2!");
    } else if (level.checkpoint1Reached) {
      // Respawn at checkpoint 1 (after tutorial)
      this.setPosition(1350, 200);
      levelManager.resetProgressOnRespawn("checkpoint1");
      console.log("Player respawned at checkpoint 1!");
    } else {
      // Normal respawn at level start
      this.setPosition(level.playerStart.x, level.playerStart.y);
      levelManager.resetProgressOnRespawn("start");
      console.log("Player respawned at level start!");
    }
  }

  checkCheckpoints() {
    const level = levelManager.getCurrentLevel();
    if (!level || !level.collectibles) return;

    // Check all checkpoint collectibles
    for (let collectible of level.collectibles) {
      if (collectible.type === "checkpoint") {
        if (this.checkCollision(collectible)) {
          // Determine which checkpoint this is based on position
          if (collectible.x < 1500) {
            // Checkpoint 1 (after tutorial)
            if (!level.checkpoint1Reached) {
              level.checkpoint1Reached = true;
              console.log("Checkpoint 1 reached!");

              // Visual feedback
              deathCounter.updateLevelHeader(
                level.name + " - Checkpoint 1 Reached!"
              );
              setTimeout(() => {
                deathCounter.updateLevelHeader(level.name);
              }, 2000);
            }
          } else if (collectible.x < 3000) {
            // Checkpoint 2 (after precision gauntlet)
            if (!level.checkpoint2Reached) {
              level.checkpoint2Reached = true;
              console.log("Checkpoint 2 reached!");

              // Visual feedback
              deathCounter.updateLevelHeader(
                level.name + " - Checkpoint 2 Reached!"
              );
              setTimeout(() => {
                deathCounter.updateLevelHeader(level.name);
              }, 2000);
            }
          } else if (collectible.x < 5000) {
            // Checkpoint 3 (after spike introduction)
            if (!level.checkpoint3Reached) {
              level.checkpoint3Reached = true;
              console.log("Checkpoint 3 reached!");

              // Visual feedback
              deathCounter.updateLevelHeader(
                level.name + " - Checkpoint 3 Reached!"
              );
              setTimeout(() => {
                deathCounter.updateLevelHeader(level.name);
              }, 2000);
            }
          } else if (collectible.x < 8000) {
            // Checkpoint 4 (after descent)
            if (!level.checkpoint4Reached) {
              level.checkpoint4Reached = true;
              console.log("Checkpoint 4 reached!");

              // Visual feedback
              deathCounter.updateLevelHeader(
                level.name + " - Checkpoint 4 Reached!"
              );
              setTimeout(() => {
                deathCounter.updateLevelHeader(level.name);
              }, 2000);
            }
          } else {
            // Checkpoint 5 (after spike gauntlet)
            if (!level.checkpoint5Reached) {
              level.checkpoint5Reached = true;
              console.log("Checkpoint 5 reached!");

              // Visual feedback
              deathCounter.updateLevelHeader(
                level.name + " - Checkpoint 5 Reached!"
              );
              setTimeout(() => {
                deathCounter.updateLevelHeader(level.name);
              }, 2000);
            }
          }
        }
      }
    }
  }

  checkBossArenaBounds(canvas) {
    const level = levelManager.getCurrentLevel();
    if (
      !level ||
      !level.bossArena ||
      !level.bossArena.triggered ||
      levelManager.bossDefeated
    )
      return;

    // Use camera bounds instead of arena bounds for full screen containment
    const cameraBounds = camera.getViewBounds();

    // Prevent player from leaving the visible screen during boss fight
    if (this.x < cameraBounds.left) {
      this.x = cameraBounds.left;
      this.velocityX = 0;
    }

    if (this.x + this.width > cameraBounds.right) {
      this.x = cameraBounds.right - this.width;
      this.velocityX = 0;
    }
  }

  handleInput() {
    // Horizontal movement
    if (inputManager.isLeftPressed()) {
      this.velocityX = -this.speed;
    } else if (inputManager.isRightPressed()) {
      this.velocityX = this.speed;
    } else {
      this.velocityX *= this.friction;
    }

    // Jumping
    if (inputManager.isJumpPressed() && this.onGround) {
      this.velocityY = -this.jumpPower;
      this.onGround = false;
    }
  }

  applyPhysics() {
    // Apply gravity
    this.velocityY += this.gravity;

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  handleCollisions() {
    const currentLevel = levelManager.getCurrentLevel();
    if (!currentLevel) return;

    this.onGround = false;

    // Check collision with each platform
    for (let platform of currentLevel.platforms) {
      if (this.checkCollision(platform)) {
        this.resolveCollision(platform);
      }
    }
  }

  checkCannoneerCollisions() {
    // Check collision with cannoneer and spike roller bodies (instant death)
    const mobs = levelManager.mobs;
    if (!mobs) return;

    for (let mob of mobs) {
      if (
        mob.active &&
        (mob.type === "cannoneer" || mob.type === "spikeRoller")
      ) {
        if (this.checkCollision(mob)) {
          console.log(`Player touched ${mob.type} body!`);
          this.die();
          return; // Exit early since player is dead
        }
      }
    }
  }

  checkBossJumpAttack() {
    // Check if player is jumping on Iron Giant boss
    const mobs = levelManager.mobs;
    if (!mobs) return;

    for (let mob of mobs) {
      if (mob.active && mob.type === "ironGiant") {
        // Check if player is falling down onto the boss
        if (this.velocityY > 0 && this.checkCollision(mob)) {
          // Check if player is above the boss (jumping on head)
          const playerBottom = this.y + this.height;
          const bossTop = mob.y;
          const bossCenter = mob.x + mob.width / 2;
          const playerCenter = this.x + this.width / 2;

          // Player must be coming from above and be reasonably centered
          if (
            playerBottom <= bossTop + 10 &&
            Math.abs(playerCenter - bossCenter) < mob.width / 2
          ) {
            console.log("Player jumped on Iron Giant head!");

            // Bounce player up
            this.velocityY = -this.jumpPower * 0.8; // Smaller bounce

            // Damage the boss
            const bossDefeated = mob.takeDamage();

            return; // Exit to prevent side collision death
          }
        }

        // If not jumping on head but touching boss = death
        if (this.checkCollision(mob) && !mob.isStunned) {
          console.log("Player touched Iron Giant body!");
          this.die();
          return;
        }
      }
    }
  }

  checkCollision(rect) {
    return (
      this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y
    );
  }

  resolveCollision(platform) {
    const overlapLeft = this.x + this.width - platform.x;
    const overlapRight = platform.x + platform.width - this.x;
    const overlapTop = this.y + this.height - platform.y;
    const overlapBottom = platform.y + platform.height - this.y;

    const wasOnGround = this.onGround;

    // Find the smallest overlap to determine collision direction
    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom
    );

    if (minOverlap === overlapTop && this.velocityY > 0) {
      // Landing on top of platform
      this.y = platform.y - this.height;
      this.velocityY = 0;
      this.onGround = true;
    } else if (minOverlap === overlapBottom && this.velocityY < 0) {
      // Hitting platform from below
      this.y = platform.y + platform.height;
      this.velocityY = 0;
    } else if (minOverlap === overlapLeft && this.velocityX > 0) {
      // Hitting platform from the left
      this.x = platform.x - this.width;
      this.velocityX = 0;
    } else if (minOverlap === overlapRight && this.velocityX < 0) {
      // Hitting platform from the right
      this.x = platform.x + platform.width;
      this.velocityX = 0;
    }
  }

  checkBounds() {
    // Only constrain to the left edge - let player move right freely
    if (this.x < 0) {
      this.x = 0;
      this.velocityX = 0;
    }
  }

  checkFallReset() {
    // Only kill player if they fall WAY off the level (much more lenient for deep descent)
    if (this.y > 1400) {
      // Increased from 1200 to 1400 to accommodate the larger level
      this.die();
    }
  }

  checkGoalReached() {
    const currentLevel = levelManager.getCurrentLevel();
    if (!currentLevel) return;

    const goal = currentLevel.goal;
    if (this.checkCollision(goal)) {
      console.log("Goal reached!");
      // Set progress to 100% when goal is reached
      if (levelManager) {
        levelManager.currentProgress = 100;
      }
      gameStateManager.completeLevel();
    }
  }

  render(ctx) {
    if (this.isDead) {
      // Render death effect - make player flash/fade
      const timeSinceDeath = Date.now() - this.deathTime;
      const flashRate = 200; // Flash every 200ms
      const shouldShow = Math.floor(timeSinceDeath / flashRate) % 2 === 0;

      if (shouldShow) {
        ctx.fillStyle = "#c0392b"; // Darker red when dead
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    } else {
      // Normal render
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

// Global player instance
const player = new Player();
