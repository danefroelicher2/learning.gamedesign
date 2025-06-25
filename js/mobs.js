// Mob and projectile system
class Mob {
    constructor(x, y, type, config = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.active = true;
        this.startX = x; // Remember starting position
        
        console.log(`Creating ${type} mob at (${x}, ${y})`);
        
        // Type-specific initialization
        switch(type) {
            case 'cannoneer':
                this.initCannoneer(config);
                break;
            case 'ironGiant':
                this.initIronGiant(config);
                break;
            case 'spikeRoller':
                this.initSpikeRoller(config);
                break;
        }
        
        console.log('Mob created successfully:', this);
    }

    initCannoneer(config) {
        this.width = 40;
        this.height = 30;
        this.fireRate = config.fireRate || 2000;
        this.lastFireTime = Date.now() - this.fireRate;
        this.range = config.range || 400;
        this.direction = config.direction || -1;
        this.shootUp = config.shootUp || false; // New: can shoot upward
        this.color = '#2c3e50';
        this.barrelColor = '#34495e';
        
        console.log(`Cannoneer ready: fireRate=${this.fireRate}, range=${this.range}, direction=${this.direction}, shootUp=${this.shootUp}`);
    }

    initIronGiant(config) {
        this.width = 60;
        this.height = 50;
        this.health = config.health || 3;
        this.maxHealth = this.health;
        this.patrolDistance = config.patrolDistance || 300;
        this.attackRate = config.attackRate || 1500;
        this.lastAttackTime = Date.now() - this.attackRate;
        this.isBoss = config.isBoss || false;
        
        // Movement properties
        this.speed = 2;
        this.direction = 1; // 1 for right, -1 for left
        this.patrolLeft = this.startX - this.patrolDistance / 2;
        this.patrolRight = this.startX + this.patrolDistance / 2;
        
        // Visual properties
        this.color = '#34495e';      // Dark gray
        this.accentColor = '#e74c3c'; // Red accents
        this.eyeColor = '#f39c12';    // Orange eyes
        
        // States
        this.isStunned = false;
        this.stunnedTime = 0;
        this.stunnedDuration = 1000; // 1 second stun after being jumped on
        
        console.log(`Iron Giant boss created: health=${this.health}, patrol=${this.patrolDistance}`);
    }

    initSpikeRoller(config) {
        this.width = 30;
        this.height = 30;
        this.speed = config.speed || 3;
        this.direction = config.direction || 1; // 1 for right, -1 for left
        
        // Platform boundaries for movement
        this.platformStart = config.platformStart || this.x;
        this.platformEnd = config.platformEnd || this.x + 150;
        
        // Visual properties
        this.color = '#8e44ad';      // Purple base
        this.spikeColor = '#2c3e50'; // Dark spikes
        this.glowColor = '#9b59b6';  // Purple glow
        
        // Animation
        this.rotationAngle = 0;
        this.rotationSpeed = 0.2;
        
        console.log(`Spike Roller created: speed=${this.speed}, platform=${this.platformStart}-${this.platformEnd}`);
    }

    update(deltaTime) {
        if (!this.active) return;

        switch(this.type) {
            case 'cannoneer':
                this.updateCannoneer(deltaTime);
                break;
            case 'ironGiant':
                this.updateIronGiant(deltaTime);
                break;
            case 'spikeRoller':
                this.updateSpikeRoller(deltaTime);
                break;
        }
    }

    updateCannoneer(deltaTime) {
        const now = Date.now();
        const timeSinceLastFire = now - this.lastFireTime;
        
        const canSee = this.canSeePlayer();
        
        if (canSee && timeSinceLastFire >= this.fireRate) {
            this.fireProjectile();
            this.lastFireTime = now;
        }
    }

    updateIronGiant(deltaTime) {
        // Handle stun state
        if (this.isStunned) {
            if (Date.now() - this.stunnedTime > this.stunnedDuration) {
                this.isStunned = false;
            }
            return; // Don't do anything while stunned
        }

        // Patrol movement
        this.x += this.speed * this.direction;
        
        // Check patrol bounds and reverse direction
        if (this.x <= this.patrolLeft || this.x >= this.patrolRight) {
            this.direction *= -1;
        }

        // Attack if player is in range
        const now = Date.now();
        if (now - this.lastAttackTime > this.attackRate) {
            if (this.canSeePlayer()) {
                this.fireProjectile();
                this.lastAttackTime = now;
            }
        }
    }

    updateSpikeRoller(deltaTime) {
        // Move back and forth on platform
        this.x += this.speed * this.direction;
        
        // Check platform bounds and reverse direction
        if (this.x <= this.platformStart || this.x + this.width >= this.platformEnd) {
            this.direction *= -1;
        }
        
        // Update rotation for visual effect
        this.rotationAngle += this.rotationSpeed;
        if (this.rotationAngle > Math.PI * 2) {
            this.rotationAngle = 0;
        }
    }

    takeDamage() {
        if (this.type !== 'ironGiant') return false;
        
        this.health--;
        this.isStunned = true;
        this.stunnedTime = Date.now();
        
        console.log(`Iron Giant took damage! Health: ${this.health}/${this.maxHealth}`);
        
        if (this.health <= 0) {
            this.active = false;
            console.log('Iron Giant defeated!');
            
            // Trigger boss defeat
            if (levelManager && levelManager.onBossDefeated) {
                levelManager.onBossDefeated();
            }
            
            return true; // Boss defeated
        }
        
        return false; // Boss still alive
    }

    canSeePlayer() {
        if (!player) return false;
        
        const playerX = player.x + player.width / 2;
        const playerY = player.y + player.height / 2;
        const mobCenterX = this.x + this.width / 2;
        const mobCenterY = this.y + this.height / 2;
        
        // Check horizontal distance
        const horizontalDistance = Math.abs(playerX - mobCenterX);
        const maxRange = this.type === 'ironGiant' ? 400 : (this.range || 400);
        
        if (horizontalDistance > maxRange) return false;
        
        // For cannoneers, check direction (but upward shooters can see in any horizontal direction)
        if (this.type === 'cannoneer' && !this.shootUp) {
            if (this.direction === -1 && playerX >= mobCenterX) return false;
            if (this.direction === 1 && playerX <= mobCenterX) return false;
        }
        
        // Check vertical distance
        const verticalDistance = Math.abs(playerY - mobCenterY);
        if (verticalDistance > 120) return false;
        
        return true;
    }

    fireProjectile() {
        let projectileX, projectileY, projectileConfig;
        
        if (this.type === 'cannoneer') {
            if (this.shootUp) {
                // Upward shooting cannoneer
                projectileX = this.x + this.width / 2 - 8; // Center horizontally
                projectileY = this.y - 10; // Above the cannoneer
                projectileConfig = {
                    direction: 0,      // No horizontal movement
                    speed: 4,
                    velocityY: -4,     // Shoot upward
                    type: 'upwardFireball'
                };
            } else {
                // Normal horizontal shooting
                projectileX = this.direction === -1 ? this.x - 10 : this.x + this.width + 10;
                projectileY = this.y + this.height / 2 - 8;
                projectileConfig = {
                    direction: this.direction,
                    speed: 4
                };
            }
        } else if (this.type === 'ironGiant') {
            // Iron Giant shoots toward player
            const playerX = player.x + player.width / 2;
            const giantCenterX = this.x + this.width / 2;
            const direction = playerX < giantCenterX ? -1 : 1;
            
            projectileX = direction === -1 ? this.x - 10 : this.x + this.width + 10;
            projectileY = this.y + this.height / 2 - 8;
            projectileConfig = {
                direction: direction,
                speed: 5, // Slightly faster than cannoneer
                type: 'bossFireball'
            };
        }
        
        const projectile = new Projectile(projectileX, projectileY, 'fireball', projectileConfig);
        projectileManager.addProjectile(projectile);
        
        console.log(`${this.type} fired projectile!`);
    }

    render(ctx) {
        if (!this.active) return;

        switch(this.type) {
            case 'cannoneer':
                this.renderCannoneer(ctx);
                break;
            case 'ironGiant':
                this.renderIronGiant(ctx);
                break;
            case 'spikeRoller':
                this.renderSpikeRoller(ctx);
                break;
        }
    }

    renderCannoneer(ctx) {
        // Draw cannoneer base
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw barrel (different orientation for upward shooters)
        const barrelWidth = this.shootUp ? 12 : 25;
        const barrelHeight = this.shootUp ? 25 : 12;
        let barrelX, barrelY;
        
        if (this.shootUp) {
            // Vertical barrel for upward shooting
            barrelX = this.x + this.width / 2 - barrelWidth / 2;
            barrelY = this.y - 15;
        } else {
            // Horizontal barrel for normal shooting
            barrelX = this.direction === -1 ? this.x - 15 : this.x + this.width - 10;
            barrelY = this.y + this.height / 2 - barrelHeight / 2;
        }
        
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
        
        // Add upward arrow indicator for upward shooting cannoneers
        if (this.shootUp) {
            ctx.fillStyle = '#e74c3c';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('↑', this.x + this.width/2, this.y - 20);
            ctx.textAlign = 'left';
        }
    }

    renderIronGiant(ctx) {
        // Flash red when stunned
        const baseColor = this.isStunned ? '#c0392b' : this.color;
        
        // Main body
        ctx.fillStyle = baseColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Red accent stripes
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x + 5, this.y + 10, this.width - 10, 6);
        ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, 6);
        
        // Glowing eyes
        ctx.fillStyle = this.eyeColor;
        ctx.fillRect(this.x + 15, this.y + 8, 8, 8);
        ctx.fillRect(this.x + this.width - 23, this.y + 8, 8, 8);
        
        // Health indicator above boss
        this.renderHealthBar(ctx);
        
        // Border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Boss label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#e74c3c';
        ctx.fillText('IRON GIANT', this.x + this.width/2, this.y - 20);
        ctx.textAlign = 'left';
    }

    renderSpikeRoller(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        // Draw glowing aura
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.width/2 + 5, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor + '30'; // Semi-transparent glow
        ctx.fill();
        
        // Draw main body (rotating)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotationAngle);
        
        // Main body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw spikes radiating from center
        ctx.fillStyle = this.spikeColor;
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const spikeLength = 12;
            const spikeWidth = 3;
            
            ctx.save();
            ctx.rotate(angle);
            ctx.fillRect(-spikeWidth/2, -this.width/2, spikeWidth, -spikeLength);
            ctx.restore();
        }
        
        ctx.restore();
        
        // Draw warning label
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️', centerX, this.y - 5);
        ctx.textAlign = 'left';
    }

    renderHealthBar(ctx) {
        const barWidth = 60;
        const barHeight = 8;
        const barX = this.x + (this.width - barWidth) / 2;
        const barY = this.y - 15;
        
        // Background
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Health
        const healthPercent = this.health / this.maxHealth;
        const healthColor = healthPercent > 0.6 ? '#2ecc71' : healthPercent > 0.3 ? '#f39c12' : '#e74c3c';
        ctx.fillStyle = healthColor;
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
        
        // Border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
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
        this.width = config.type === 'bossFireball' ? 20 : 16;
        this.height = config.type === 'bossFireball' ? 20 : 16;
        this.speed = config.speed || 4;
        this.direction = config.direction || -1;
        this.velocityX = this.speed * this.direction;
        this.velocityY = config.velocityY || 0; // New: support for vertical movement
        this.color = config.type === 'bossFireball' ? '#8e44ad' : '#e74c3c'; // Purple for boss
        this.glowColor = config.type === 'bossFireball' ? '#9b59b6' : '#f39c12';
        this.lifetime = 8000;
        this.createdTime = Date.now();
        this.isBossProjectile = config.type === 'bossFireball';
        this.isUpwardProjectile = config.type === 'upwardFireball';
        
        console.log(`Fireball created: speed=${this.speed}, direction=${this.direction}, velocityY=${this.velocityY}, upward=${this.isUpwardProjectile}`);
    }

    update() {
        if (!this.active) return;

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.checkPlayerCollision();
        this.checkPlatformCollisions();
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
        if (Date.now() - this.createdTime > this.lifetime) {
            this.active = false;
        }
        
        if (this.x < -200 || this.x > 12000) { // Increased for larger map
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
        // Larger glow for boss projectiles
        const glowSize = this.isBossProjectile ? this.width + 12 : this.width + 4;
        
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, glowSize/2, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor + '40';
        ctx.fill();
        
        // Main fireball
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Highlight
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 2, this.y + this.height/2 - 2, this.width/4, 0, Math.PI * 2);
        ctx.fillStyle = this.isBossProjectile ? '#f1c40f' : '#f1c40f';
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