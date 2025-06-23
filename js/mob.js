// Mob and projectile system
class Mob {
    constructor(x, y, type, config = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.active = true;
        
        // Type-specific initialization
        switch(type) {
            case 'cannoneer':
                this.initCannoneer(config);
                break;
        }
    }

    initCannoneer(config) {
        this.width = 40;
        this.height = 30;
        this.fireRate = config.fireRate || 2000; // Fire every 2 seconds
        this.lastFireTime = 0;
        this.range = config.range || 400; // How far the cannoneer can "see"
        this.direction = config.direction || -1; // -1 for left, 1 for right
        this.color = '#2c3e50'; // Dark blue-gray for cannoneer body
        this.barrelColor = '#34495e'; // Slightly lighter for barrel
    }

    update(deltaTime) {
        if (!this.active) return;

        switch(this.type) {
            case 'cannoneer':
                this.updateCannoneer(deltaTime);
                break;
        }
    }

    updateCannoneer(deltaTime) {
        // Check if player is in range and line of sight
        if (this.canSeePlayer()) {
            // Fire projectile if enough time has passed
            if (Date.now() - this.lastFireTime > this.fireRate) {
                this.fireProjectile();
                this.lastFireTime = Date.now();
            }
        }
    }

    canSeePlayer() {
        // Simple line of sight - check if player is in horizontal range
        const playerX = player.x + player.width / 2;
        const playerY = player.y + player.height / 2;
        const cannoneerCenterX = this.x + this.width / 2;
        const cannoneerCenterY = this.y + this.height / 2;
        
        // Check horizontal distance
        const horizontalDistance = Math.abs(playerX - cannoneerCenterX);
        if (horizontalDistance > this.range) return false;
        
        // Check if player is on the correct side (direction the cannoneer faces)
        if (this.direction === -1 && playerX >= cannoneerCenterX) return false;
        if (this.direction === 1 && playerX <= cannoneerCenterX) return false;
        
        // Check if player is roughly at the same height (within reasonable range)
        const verticalDistance = Math.abs(playerY - cannoneerCenterY);
        if (verticalDistance > 120) return false;
        
        return true;
    }

    fireProjectile() {
        // Create fireball projectile
        const projectileX = this.direction === -1 ? this.x : this.x + this.width;
        const projectileY = this.y + this.height / 2;
        
        const projectile = new Projectile(projectileX, projectileY, 'fireball', {
            direction: this.direction,
            speed: 4
        });
        
        // Add to projectile manager
        projectileManager.addProjectile(projectile);
    }

    render(ctx) {
        if (!this.active) return;

        switch(this.type) {
            case 'cannoneer':
                this.renderCannoneer(ctx);
                break;
        }
    }

    renderCannoneer(ctx) {
        // Draw cannoneer base (rectangular body)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw cannoneer barrel
        const barrelWidth = 25;
        const barrelHeight = 12;
        const barrelX = this.direction === -1 ? this.x - 15 : this.x + this.width - 10;
        const barrelY = this.y + this.height / 2 - barrelHeight / 2;
        
        ctx.fillStyle = this.barrelColor;
        ctx.fillRect(barrelX, barrelY, barrelWidth, barrelHeight);
        
        // Add some detail - cannoneer wheels/base
        ctx.fillStyle = '#1a252f';
        ctx.fillRect(this.x + 5, this.y + this.height - 8, 8, 8);
        ctx.fillRect(this.x + this.width - 13, this.y + this.height - 8, 8, 8);
        
        // Add a border for definition
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Projectile {
    constructor(x, y, type, config = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.active = true;
        
        switch(type) {
            case 'fireball':
                this.initFireball(config);
                break;
        }
    }

    initFireball(config) {
        this.width = 16;
        this.height = 16;
        this.speed = config.speed || 3;
        this.direction = config.direction || -1;
        this.velocityX = this.speed * this.direction;
        this.velocityY = 0;
        this.color = '#e74c3c'; // Red for fireball
        this.glowColor = '#f39c12'; // Orange glow
        this.lifetime = 5000; // 5 seconds before auto-destroy
        this.createdTime = Date.now();
    }

    update() {
        if (!this.active) return;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Check collision with player
        this.checkPlayerCollision();

        // Check collision with platforms
        this.checkPlatformCollisions();

        // Remove if too old or off screen
        this.checkLifetime();
    }

    checkPlayerCollision() {
        if (this.checkCollision(player)) {
            // Player hit by projectile - trigger death
            this.active = false;
            player.die();
        }
    }

    checkPlatformCollisions() {
        const currentLevel = levelManager.getCurrentLevel();
        if (!currentLevel) return;

        for (let platform of currentLevel.platforms) {
            if (this.checkCollision(platform)) {
                this.active = false; // Destroy on platform hit
                break;
            }
        }
    }

    checkCollision(target) {
        return this.x < target.x + target.width &&
               this.x + this.width > target.x &&
               this.y < target.y + target.height &&
               this.y + this.height > target.y;
    }

    checkLifetime() {
        const canvas = document.getElementById('gameCanvas');
        
        // Remove if too old
        if (Date.now() - this.createdTime > this.lifetime) {
            this.active = false;
        }
        
        // Remove if off screen
        if (this.x < -50 || this.x > canvas.width + 50) {
            this.active = false;
        }
    }

    render(ctx) {
        if (!this.active) return;

        switch(this.type) {
            case 'fireball':
                this.renderFireball(ctx);
                break;
        }
    }

    renderFireball(ctx) {
        // Draw glow effect
        const glowSize = this.width + 8;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, glowSize/2, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor + '40'; // Add transparency
        ctx.fill();
        
        // Draw main fireball
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add inner highlight
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 2, this.y + this.height/2 - 2, this.width/4, 0, Math.PI * 2);
        ctx.fillStyle = '#f1c40f'; // Bright yellow center
        ctx.fill();
    }
}

// Projectile Manager to handle all active projectiles
class ProjectileManager {
    constructor() {
        this.projectiles = [];
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    update() {
        // Update all projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].update();
            
            // Remove inactive projectiles
            if (!this.projectiles[i].active) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        for (let projectile of this.projectiles) {
            projectile.render(ctx);
        }
    }

    clearAll() {
        this.projectiles = [];
    }
}

// Global instances
const projectileManager = new ProjectileManager();