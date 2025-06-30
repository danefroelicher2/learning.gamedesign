// Level management system with progress tracking
class LevelManager {
    constructor() {
        this.currentLevelIndex = 0;
        this.currentLevel = null;
        this.mobs = []; // Track active mobs
        this.bossDefeated = false;
        this.currentProgress = 0; // Track player progress percentage
    }

    startLevel(levelIndex) {
        if (levelIndex >= LEVELS.length) {
            console.log('No more levels!');
            return;
        }

        this.currentLevelIndex = levelIndex;
        this.currentLevel = LEVELS[levelIndex];
        this.bossDefeated = false;
        this.currentProgress = 0; // Reset progress
        
        console.log('Starting level:', this.currentLevel);
        
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
        gameStateManager.setState('playing');
        
        console.log(`Starting ${this.currentLevel.name}`);
    }

    initializeMobs() {
        this.mobs = [];
        
        console.log('Current level mobs:', this.currentLevel.mobs);
        
        if (!this.currentLevel || !this.currentLevel.mobs) {
            console.log('No mobs defined for this level');
            return;
        }
        
        // Create mob instances from level data
        for (let mobData of this.currentLevel.mobs) {
            console.log('Creating mob with data:', mobData);
            const mob = new Mob(mobData.x, mobData.y, mobData.type, mobData.config || {});
            this.mobs.push(mob);
        }
        
        console.log(`Successfully initialized ${this.mobs.length} mobs`);
    }

    calculateLevelBounds() {
        if (!this.currentLevel) return;
        
        // Find the rightmost and bottommost points in the level
        let maxX = 800; // Minimum level width
        let maxY = 1200; // Increased for deep descent (was 400)
        
        // Check platforms for both width and height
        for (let platform of this.currentLevel.platforms) {
            maxX = Math.max(maxX, platform.x + platform.width + 100);
            maxY = Math.max(maxY, platform.y + platform.height + 100); // Include deep platforms
        }
        
        // Check goal
        if (this.currentLevel.goal) {
            maxX = Math.max(maxX, this.currentLevel.goal.x + this.currentLevel.goal.width + 100);
        }
        
        // Set camera bounds to allow deep descent
        camera.setLevelBounds(maxX, maxY);
        
        console.log(`Level bounds set: width=${maxX}, height=${maxY}`);
    }

    // NEW: Calculate and update progress based on player position
    updateProgress() {
        if (!this.currentLevel || !this.currentLevel.progressMarkers) return;

        const playerX = player.x;
        let newProgress = 0;

        // Special case: if boss is defeated, jump to 99%
        if (this.bossDefeated && this.currentProgress < 99) {
            this.currentProgress = 99;
            return;
        }

        // Find the appropriate progress based on player X position
        const markers = this.currentLevel.progressMarkers;
        const positions = Object.keys(markers).map(x => parseInt(x)).sort((a, b) => a - b);

        for (let i = 0; i < positions.length - 1; i++) {
            const currentPos = positions[i];
            const nextPos = positions[i + 1];

            if (playerX >= currentPos && playerX < nextPos) {
                // Interpolate between current and next marker
                const progressRange = markers[nextPos] - markers[currentPos];
                const positionRange = nextPos - currentPos;
                const playerOffset = playerX - currentPos;
                
                newProgress = markers[currentPos] + (progressRange * (playerOffset / positionRange));
                break;
            }
        }

        // Handle final section
        const lastPosition = positions[positions.length - 1];
        if (playerX >= lastPosition) {
            newProgress = markers[lastPosition];
        }

        // Only update if progress has increased (no going backwards)
        if (newProgress > this.currentProgress) {
            this.currentProgress = Math.min(100, Math.floor(newProgress));
        }
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    updateUI() {
        // Update level header in top-left
        deathCounter.updateLevelHeader(this.currentLevel.name);
        
        // Update controls
        const controls = document.getElementById('controls');
        if (controls) {
            controls.textContent = 'WASD/Arrow Keys: Move & Jump | Jump on boss head to defeat it!';
        }
    }

    update(deltaTime) {
        if (gameStateManager.currentState !== 'playing') return;
        
        // Update progress tracking
        this.updateProgress();
        
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
            console.log('Player entered boss arena! Locking camera...');
            
            // Mark as triggered
            this.currentLevel.bossArena.triggered = true;
            
            // Lock camera to boss arena - make it full screen width
            camera.lockToBossArena(arena.x, arena.width);
            
            // Update UI for boss fight
            deathCounter.updateLevelHeader(this.currentLevel.name + " - BOSS FIGHT");
        }
    }

    onBossDefeated() {
        console.log('Boss defeated! Unlocking camera...');
        
        this.bossDefeated = true;
        
        // Unlock camera
        camera.unlockFromBossArena();
        
        // Update progress to 99%
        this.currentProgress = 99;
        
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
        this.drawCheckpoint(ctx); // Draw checkpoint flags
        this.drawGoal(ctx);
        this.drawMobs(ctx);
        this.drawProjectiles(ctx);
        this.drawBossArenaIndicators(ctx, canvas);
        this.drawProgressBar(ctx, canvas); // NEW: Draw progress bar
    }

    // NEW: Draw progress bar at top of screen (follows camera)
    drawProgressBar(ctx, canvas) {
        const barWidth = canvas.width * 0.6; // 60% of screen width
        const barHeight = 20;
        
        // Get camera position to make progress bar follow the view
        const viewBounds = camera.getViewBounds();
        const barX = viewBounds.left + (canvas.width - barWidth) / 2; // Center in current view
        const barY = viewBounds.top + 20; // Top of current view

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(barX - 5, barY - 5, barWidth + 10, barHeight + 10);

        // Progress bar background
        ctx.fillStyle = '#34495e';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Progress fill
        const progressWidth = (barWidth * this.currentProgress) / 100;
        
        // Color based on progress
        let progressColor;
        if (this.currentProgress < 30) {
            progressColor = '#2ecc71'; // Green - early game
        } else if (this.currentProgress < 60) {
            progressColor = '#f39c12'; // Orange - mid game
        } else if (this.currentProgress < 90) {
            progressColor = '#e67e22'; // Darker orange - getting intense
        } else if (this.currentProgress < 99) {
            progressColor = '#e74c3c'; // Red - boss fight
        } else {
            progressColor = '#9b59b6'; // Purple - victory
        }

        ctx.fillStyle = progressColor;
        ctx.fillRect(barX, barY, progressWidth, barHeight);

        // Border
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Progress text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        
        let progressText;
        if (this.currentProgress >= 90 && this.currentProgress < 99) {
            progressText = 'BOSS FIGHT!';
        } else if (this.currentProgress >= 99) {
            progressText = this.currentProgress === 100 ? 'COMPLETE!' : 'VICTORY!';
        } else {
            progressText = `${this.currentProgress}%`;
        }
        
        ctx.fillText(progressText, barX + barWidth / 2, barY + 15); // Center text in bar
        ctx.textAlign = 'left';

        // Level progress indicators (optional milestone markers)
        this.drawProgressMilestones(ctx, barX, barY, barWidth, barHeight);
    }

    // NEW: Reset progress based on respawn location
    resetProgressOnRespawn(respawnType) {
        const level = this.currentLevel;
        if (!level || !level.progressMarkers) return;

        switch(respawnType) {
            case 'start':
                this.currentProgress = 0;
                console.log('Progress reset to 0% (level start)');
                break;
            case 'firstCheckpoint':
                this.currentProgress = 40; // First checkpoint is at 40%
                console.log('Progress reset to 40% (first checkpoint)');
                break;
            case 'secondCheckpoint':
                this.currentProgress = 65; // Second checkpoint is at 65%
                console.log('Progress reset to 65% (second checkpoint)');
                break;
            case 'bossArena':
                this.currentProgress = 90; // Boss arena is at 90%
                console.log('Progress reset to 90% (boss arena)');
                break;
        }
    }
    }

    // NEW: Draw milestone markers on progress bar
    drawProgressMilestones(ctx, barX, barY, barWidth, barHeight) {
        const milestones = [25, 50, 75, 90]; // Key milestone percentages
        
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;

        for (let milestone of milestones) {
            const x = barX + (barWidth * milestone) / 100;
            ctx.beginPath();
            ctx.moveTo(x, barY);
            ctx.lineTo(x, barY + barHeight);
            ctx.stroke();
        }
    }

    drawBackground(ctx, canvas) {
        const bg = this.currentLevel.background;
        
        // Calculate the actual level dimensions from platforms and goal
        let levelWidth = canvas.width;
        let levelHeight = 1200; // Minimum height for deep levels
        
        for (let platform of this.currentLevel.platforms) {
            levelWidth = Math.max(levelWidth, platform.x + platform.width);
            levelHeight = Math.max(levelHeight, platform.y + platform.height);
        }
        
        if (this.currentLevel.goal) {
            levelWidth = Math.max(levelWidth, this.currentLevel.goal.x + this.currentLevel.goal.width);
        }
        
        // Add extra padding to ensure full coverage
        levelWidth += 200;
        levelHeight += 200;
        
        // Create gradient that spans the entire level (including deep areas)
        const gradient = ctx.createLinearGradient(0, 0, 0, levelHeight);
        gradient.addColorStop(0, bg.color1);
        gradient.addColorStop(1, bg.color2);
        ctx.fillStyle = gradient;
        
        // Draw background across the entire level dimensions
        ctx.fillRect(0, 0, levelWidth, levelHeight);
    }

    drawPlatforms(ctx) {}
        // Different platform types could have different colors/textures
        for (let platform of this.currentLevel.platforms) {
            if (platform.type === 'ground') {
                ctx.fillStyle = '#8B4513'; // Brown for ground
            } else if (platform.type === 'wall') {
                ctx.fillStyle = '#2c3e50'; // Dark blue-gray for walls
            } else {
                ctx.fillStyle = '#CD853F'; // Sandy brown for platforms
            }
            
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            
            // Add a simple border for visual appeal
            ctx.strokeStyle = platform.type === 'wall' ? '#34495e' : '#654321';
            ctx.lineWidth = 2;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    }

    drawCheckpoint(ctx) {
        const level = this.currentLevel;
        if (!level || !level.collectibles) return;
        
        for (let collectible of level.collectibles) {
            if (collectible.type === 'checkpoint') {
                // Determine if this checkpoint has been reached
                let isReached = false;
                if (collectible.x < 5000) { // First checkpoint
                    isReached = level.checkpointReached;
                } else { // Second checkpoint
                    isReached = level.secondCheckpointReached;
                }
                
                // Draw checkpoint flag
                const color = isReached ? '#2ecc71' : '#f39c12'; // Green if reached, orange if not
                
                // Flag
                ctx.fillStyle = color;
                ctx.fillRect(collectible.x, collectible.y, collectible.width, collectible.height);
                
                // Flagpole
                ctx.fillStyle = '#8B4513'; // Brown pole
                ctx.fillRect(collectible.x + collectible.width/2 - 2, collectible.y, 4, collectible.height + 20);
                
                // Pole base
                ctx.fillRect(collectible.x + collectible.width/2 - 6, collectible.y + collectible.height + 16, 12, 4);
                
                // Checkpoint label
                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('CHECKPOINT', collectible.x + collectible.width/2, collectible.y - 10);
                ctx.textAlign = 'left';
            }
        }
    }

    drawBossArenaIndicators(ctx, canvas) {
        // Only draw boss arena label - NO RED BARS
        if (this.currentLevel.bossArena && this.currentLevel.bossArena.triggered && !this.bossDefeated) {
            const arena = this.currentLevel.bossArena;
            
            // Only show boss arena label in the sky - no boundary markers
            ctx.fillStyle = '#e74c3c';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('⚔️ BOSS ARENA ⚔️', canvas.width / 2, 100); // Center of screen
            ctx.textAlign = 'left';
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