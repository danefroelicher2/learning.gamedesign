// Mob and projectile system
class Mob {
    constructor(x, y, type, config = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.active = true;
        
        console.log(`Creating ${type} mob at (${x}, ${y})`);
        
        // Type-specific initialization
        switch(type) {
            case 'cannoneer':
                this.initCannoneer(config);
                break;
        }
        
        console.log('Mob created successfully:', this);
    }

    initCannoneer(config) {
        this.width = 40;
        this.height = 30;
        this.fireRate = config.fireRate || 2000;
        this.lastFireTime = Date.now() - this.fireRate; // Allow immediate first shot
        this.range = config.range || 400;
        this.direction = config.direction || -1;
        this.color = '#2c3e50';
        this.barrelColor = '#34495e';
        
        console.log(`Cannoneer ready: fireRate=${this.fireRate}, range=${this.range}, direction=${this.direction}`);
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
        const now = Date.now();
        const timeSinceLastFire = now - this.lastFireTime;
        
        // Check if player is in range and line of sight
        const canSee = this.canSeePlayer();
        
        if (canSee && timeSinceLastFire >= this.fireRate) {
            console.log(`FIRING! Cannoneer at (${this.x}, ${this.y})`);
            this.fireProjectile();
            this.lastFireTime = now;
        }
    }

    canSeePlayer() {
        if (!player) return false;
        
        const playerX = player.x + player.width / 2;
        const playerY = player.y + player.height / 2;
        const cannoneerCenterX = this.x + this.width / 2;
        const cannoneerCenterY = this.y + this.height / 2;
        
        // Check horizontal distance
        const horizontalDistance = Math.abs(playerX - cannoneerCenterX);
        if (horizontalDistance > this.range) return false;
        
        // Check if player is on the correct side
        if (this.direction === -1 && playerX >= cannoneerCenterX) return false;
        if (this.direction === 1 && playerX <= cannoneerCenterX) return false;
        
        // Check vertical distance
        const verticalDistance = Math.abs(playerY - cannoneerCenterY);
        if (verticalDistance > 120) return false;
        
        return true;
    }

    fireProjectile() {
        const projectileX = this.direction === -1 ? this.x - 10 : this.x + this.width + 10;
        const projectileY = this.y + this.height / 2 - 8;
        
        const projectile = new Projectile(projectileX, projectileY, 'fireball', {
            direction: this.direction,
            speed: 4
        });
        
        projectileManager.addProjectile(projectile);
        console.log('Projectile fired from cannoneer!');
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
        // Draw cannoneer base
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw cannoneer barrel
        const barrelWidth = 25;
        const barrelHeight = 12;
        const barrelX = this.direction === -1 ? this.x - 15 : this.x + this.width - 10;
        const barrelY = this.y + this.height / 2 - barrelHeight / 2;
        
        ctx.fillStyle = this.barrelColor;
        ctx.fillRect(barrelX, barrelY, barrelWidth, barrelHeight);
        
        // Add wheels
        ctx.fillStyle = '#1a252f';
        ctx.fillRect(this.x + 5, this.y + this.height - 8, 8, 8);
        ctx.fillRect(this.x + this.width - 13, this.y + this.height - 8, 8, 8);
        
        // Border
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
        
        console.log(`Creating projectile at (${x}, ${y})`);
        
        switch(type) {
            case 'fireball':
                this.initFireball(config);
                break;
        }
    }

    initFireball(config) {
        this.width = 16;
        this.height = 16;
        this.speed = config.speed || 4;
        this.direction = config.direction || -1;
        this.velocityX = this.speed * this.direction;
        this.velocityY = 0;
        this.color = '#e74c3c';
        this.glowColor = '#f39c12';
        this.lifetime = 8000;
        this.createdTime = Date.now();
        
        console.log(`Fireball created: speed=${this.speed}, direction=${this.direction}, velocityX=${this.velocityX}`);
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
        if (!player || player.isDead) return;
        
        if (this.checkCollision(player)) {
            this.active = false;
            player.die();
            console.log('Player hit by projectile!');
        }
    }

    checkPlatformCollisions() {
        const currentLevel = levelManager.getCurrentLevel();
        if (!currentLevel) return;

        for (let platform of currentLevel.platforms) {
            if (this.checkCollision(platform)) {
                this.active = false;
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
        // Remove if too old
        if (Date.now() - this.createdTime > this.lifetime) {
            this.active = false;
        }
        
        // Remove if way off screen
        if (this.x < -200 || this.x > 3000) {
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
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width + 4, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor + '40';
        ctx.fill();
        
        // Draw main fireball
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add highlight
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 2, this.y + this.height/2 - 2, this.width/4, 0, Math.PI * 2);
        ctx.fillStyle = '#f1c40f';
        ctx.fill();
    }
}

class ProjectileManager {
    constructor() {
        this.projectiles = [];
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
        console.log(`Projectile added! Total: ${this.projectiles.length}`);
    }

    update() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].update();
            
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
        console.log('All projectiles cleared');
    }
}

// Global instances
const projectileManager = new ProjectileManager();