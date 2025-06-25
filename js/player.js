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
    this.checkBounds(); // Changed from constrainToScreen
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
    if (level) {
      this.setPosition(level.playerStart.x, level.playerStart.y);
      console.log("Player respawned!");
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

      // Debug: show player position
      console.log(
        `Player position: (${Math.round(this.x)}, ${Math.round(this.y)})`
      );
    }
  }
}

// Global player instance
const player = new Player();
