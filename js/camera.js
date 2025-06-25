// Camera system for following the player and scrolling levels
class Camera {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.followSpeed = 0.1; // How smoothly camera follows (0.1 = smooth, 1 = instant)
    this.offsetX = this.canvas.width / 3; // Keep player at 1/3 from left edge
    this.offsetY = 0; // No vertical offset for now

    // Bounds for camera movement
    this.minX = 0;
    this.maxX = 0;
    this.minY = 0;
    this.maxY = 0;

    // Boss arena lock
    this.isLockedToBossArena = false;
    this.bossArenaX = 0;
    this.bossArenaWidth = 0;
  }

  setLevelBounds(levelWidth, levelHeight = 400) {
    // Set camera bounds based on level size
    this.maxX = Math.max(0, levelWidth - this.canvas.width);
    this.maxY = Math.max(0, levelHeight - this.canvas.height);
    this.minX = 0;
    this.minY = 0;
  }

  lockToBossArena(arenaX, arenaWidth) {
    this.isLockedToBossArena = true;
    this.bossArenaX = arenaX;
    this.bossArenaWidth = arenaWidth;

    // Center camera on boss arena
    const targetX = arenaX + arenaWidth / 2 - this.canvas.width / 2;
    this.x = Math.max(this.minX, Math.min(this.maxX, targetX));

    console.log(
      `Camera locked to boss arena at x: ${arenaX}, width: ${arenaWidth}`
    );
  }

  unlockFromBossArena() {
    this.isLockedToBossArena = false;
    console.log("Camera unlocked from boss arena");
  }

  update() {
    if (gameStateManager.currentState !== "playing") {
      // Reset camera when not playing
      this.x = 0;
      this.y = 0;
      return;
    }

    // If locked to boss arena, don't follow player
    if (this.isLockedToBossArena) {
      return; // Camera stays fixed on boss arena
    }

    // Calculate target camera position based on player
    const targetX = player.x - this.offsetX;
    const targetY = player.y - this.offsetY;

    // Smoothly move camera toward target
    this.x += (targetX - this.x) * this.followSpeed;
    this.y += (targetY - this.y) * this.followSpeed;

    // Constrain camera to level bounds (but don't constrain player movement)
    this.x = Math.max(this.minX, Math.min(this.maxX, this.x));
    this.y = Math.max(this.minY, Math.min(this.maxY, this.y));
  }

  apply(ctx) {
    // Apply camera translation to the rendering context
    ctx.save();
    ctx.translate(-this.x, -this.y);
  }

  restore(ctx) {
    // Restore the rendering context
    ctx.restore();
  }

  // Get the current view bounds (useful for culling off-screen objects)
  getViewBounds() {
    return {
      left: this.x,
      right: this.x + this.canvas.width,
      top: this.y,
      bottom: this.y + this.canvas.height,
    };
  }

  // Convert screen coordinates to world coordinates
  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.x,
      y: screenY + this.y,
    };
  }

  // Convert world coordinates to screen coordinates
  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.x,
      y: worldY - this.y,
    };
  }

  // Check if a rectangle is visible in the current camera view (for optimization)
  isVisible(x, y, width, height) {
    const bounds = this.getViewBounds();
    return !(
      x + width < bounds.left ||
      x > bounds.right ||
      y + height < bounds.top ||
      y > bounds.bottom
    );
  }
}

// Global camera instance
const camera = new Camera(document.getElementById("gameCanvas"));
