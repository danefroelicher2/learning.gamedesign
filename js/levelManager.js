// Level management system
class LevelManager {
    constructor() {
        this.currentLevelIndex = 0;
        this.currentLevel = null;
    }

    startLevel(levelIndex) {
        if (levelIndex >= LEVELS.length) {
            console.log('No more levels!');
            return;
        }

        this.currentLevelIndex = levelIndex;
        this.currentLevel = LEVELS[levelIndex];
        
        // Reset player to level start position
        player.setPosition(
            this.currentLevel.playerStart.x, 
            this.currentLevel.playerStart.y
        );

        // Update UI
        this.updateUI();
        
        // Change to playing state
        gameStateManager.setState('playing');
        
        console.log(`Starting ${this.currentLevel.name}`);
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    updateUI() {
        const levelDisplay = document.getElementById('levelDisplay');
        const gameInfo = document.getElementById('gameInfo');
        const controls = document.getElementById('controls');
        
        if (levelDisplay) levelDisplay.textContent = this.currentLevel.id;
        if (gameInfo) gameInfo.textContent = `Level: ${this.currentLevel.id} - ${this.currentLevel.name}`;
        if (controls) controls.textContent = 'Use WASD or Arrow Keys to move and jump';
    }

    render(ctx, canvas) {
        if (!this.currentLevel) return;

        this.drawBackground(ctx, canvas);
        this.drawPlatforms(ctx);
        this.drawGoal(ctx);
        
        // Future: this.drawEnemies(ctx);
        // Future: this.drawCollectibles(ctx);
    }

    drawBackground(ctx, canvas) {
        const bg = this.currentLevel.background;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, bg.color1);
        gradient.addColorStop(1, bg.color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawPlatforms(ctx) {
        // Different platform types could have different colors/textures
        for (let platform of this.currentLevel.platforms) {
            if (platform.type === 'ground') {
                ctx.fillStyle = '#8B4513'; // Brown for ground
            } else {
                ctx.fillStyle = '#CD853F'; // Sandy brown for platforms
            }
            
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            
            // Add a simple border for visual appeal
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 2;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    }

    drawGoal(ctx) {
        const goal = this.currentLevel.goal;
        
        // Draw flag
        ctx.fillStyle = '#2ecc71'; // Green flag
        ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
        
        // Draw flagpole
        ctx.fillStyle = '#34495e'; // Dark gray pole
        ctx.fillRect(goal.x + goal.width/2 - 2, goal.y, 4, goal.height + 20);
        
        // Add pole base
        ctx.fillRect(goal.x + goal.width/2 - 6, goal.y + goal.height + 16, 12, 4);
    }

    // Future expansion methods
    drawEnemies(ctx) {
        // Will implement when we add enemies
        for (let enemy of this.currentLevel.enemies) {
            // Draw enemy based on type
        }
    }

    drawCollectibles(ctx) {
        // Will implement when we add coins, power-ups, etc.
        for (let collectible of this.currentLevel.collectibles) {
            // Draw collectible based on type
        }
    }
}

// Global level manager instance
const levelManager = new LevelManager();