// Player class handles all player-related functionality
class Player {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.speed = 5;
        this.jumpPower = 12;
        this.gravity = 0.5;
        this.friction = 0.8;
        this.color = '#e74c3c';
        
        this.reset();
    }

    reset() {
        this.x = 50;
        this.y = 200;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
    }

    update(canvas) {
        if (gameStateManager.currentState !== 'playing') return;

        this.handleInput();
        this.applyPhysics();
        this.handleCollisions();
        this.constrainToScreen(canvas);
        this.checkFallReset();
        this.checkGoalReached();
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
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y;
    }

    resolveCollision(platform) {
        // Landing on top of platform
        if (this.velocityY > 0 && this.y < platform.y) {
            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }
        // Hitting platform from below
        else if (this.velocityY < 0 && this.y > platform.y) {
            this.y = platform.y + platform.height;
            this.velocityY = 0;
        }
        // Hitting platform from the side
        else if (this.velocityX > 0) {
            this.x = platform.x - this.width;
        } else if (this.velocityX < 0) {
            this.x = platform.x + platform.width;
        }
    }

    constrainToScreen(canvas) {
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

    checkFallReset() {
        const canvas = document.getElementById('gameCanvas');
        if (this.y > canvas.height) {
            const level = levelManager.getCurrentLevel();
            if (level) {
                this.setPosition(level.playerStart.x, level.playerStart.y);
            }
        }
    }

    checkGoalReached() {
        const currentLevel = levelManager.getCurrentLevel();
        if (!currentLevel) return;

        const goal = currentLevel.goal;
        if (this.checkCollision(goal)) {
            gameStateManager.completeLevel();
        }
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Global player instance
const player = new Player();