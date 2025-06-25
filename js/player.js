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
    this.checkBossArenaBounds(); // New: Check boss arena boundaries
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

    // Check if player died in boss arena
    if (
      level.bossArena &&
      level.bossArena.triggered &&
      !levelManager.bossDefeated
    ) {
      // Respawn at boss arena entrance
      this.setPosition(level.bossArena.respawnX, level.bossArena.respawnY);
      console.log("Player respawned at boss arena entrance!");
    } else {
      // Normal respawn at level start
      this.setPosition(level.playerStart.x, level.playerStart.y);
      console.log("Player respawned at level start!");
    }
  }

  checkBossArenaBounds() {
    const level = levelManager.getCurrentLevel();
    if (
      !level ||
      !level.bossArena ||
      !level.bossArena.triggered ||
      levelManager.bossDefeated
    )
      return;

    const arena = level.bossArena;

    // Prevent player from leaving boss arena (invisible walls)
    if (this.x < arena.x) {
      this.x = arena.x;
      this.velocityX = 0;
    }

    if (this.x + this.width > arena.x + arena.width) {
      this.x = arena.x + arena.width - this.width;
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
    // Check collision with cannoneer bodies (instant death)
    const mobs = levelManager.mobs;
    if (!mobs) return;

    for (let mob of mobs) {
      if (mob.active && mob.type === "cannoneer") {
        if (this.checkCollision(mob)) {
          console.log("Player touched cannoneer body!");
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

    // Don't constrain right movement - let camera handle it
    // The camera system will manage the right boundary
  }

  checkFallReset() {
    // Falling off screen counts as death
    if (this.y > 600) {
      // Increased threshold for larger levels
      this.die();
    }
  }

  checkGoalReached() {
    const currentLevel = levelManager.getCurrentLevel();
    if (!currentLevel) return;

    const goal = currentLevel.goal;
    if (this.checkCollision(goal)) {
      console.log("Goal reached!");
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
