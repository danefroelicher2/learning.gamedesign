// Game state management system
class GameStateManager {
    constructor() {
        this.currentState = 'worldMap'; // 'worldMap', 'playing', 'levelComplete', 'gameComplete'
        this.previousState = null;
    }

    setState(newState) {
        this.previousState = this.currentState;
        this.currentState = newState;
        this.onStateChange();
    }

    onStateChange() {
        // Update UI based on current state
        this.updateUI();
        
        console.log(`State changed: ${this.previousState} -> ${this.currentState}`);
    }

    updateUI() {
        const gameInfo = document.getElementById('gameInfo');
        const controls = document.getElementById('controls');
        
        switch (this.currentState) {
            case 'worldMap':
                if (gameInfo) gameInfo.textContent = 'World Map';
                if (controls) controls.textContent = 'Use A/D to move, Enter/Space to enter level';
                break;
                
            case 'playing':
                // UI is updated by levelManager when level starts
                break;
                
            case 'levelComplete':
                // Show completion message - handled in render
                break;
                
            case 'gameComplete':
                if (gameInfo) gameInfo.textContent = 'Game Complete!';
                if (controls) controls.textContent = 'Thanks for playing!';
                break;
        }
    }

    completeLevel() {
        const currentLevelIndex = levelManager.currentLevelIndex;
        
        // Mark level as complete in world map
        worldMap.completeLevel(currentLevelIndex);
        
        // Set completion state
        this.setState('levelComplete');
        
        // Return to world map after delay
        setTimeout(() => {
            this.setState('worldMap');
        }, 2000);
    }

    render(ctx, canvas) {
        switch (this.currentState) {
            case 'worldMap':
                worldMap.render(ctx, canvas);
                break;
                
            case 'playing':
                levelManager.render(ctx, canvas);
                player.render(ctx);
                break;
                
            case 'levelComplete':
                // Keep showing the level
                levelManager.render(ctx, canvas);
                player.render(ctx);
                
                // Overlay completion message
                this.renderLevelCompleteOverlay(ctx, canvas);
                break;
                
            case 'gameComplete':
                this.renderGameCompleteScreen(ctx, canvas);
                break;
        }
    }

    renderLevelCompleteOverlay(ctx, canvas) {
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // "Level Complete!" message
        ctx.fillStyle = '#2ecc71';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Level Complete!', canvas.width/2, canvas.height/2);
        
        // Subtitle
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        ctx.fillText('Returning to world map...', canvas.width/2, canvas.height/2 + 40);
        
        // Reset text alignment
        ctx.textAlign = 'left';
    }

    renderGameCompleteScreen(ctx, canvas) {
        // Full screen overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // "Game Complete!" message
        ctx.fillStyle = '#f39c12';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Complete!', canvas.width/2, canvas.height/2);
        
        // Thank you message
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Thanks for playing!', canvas.width/2, canvas.height/2 + 60);
        
        // Stats or additional info could go here
        ctx.font = '16px Arial';
        ctx.fillStyle = '#bdc3c7';
        ctx.fillText('Refresh to play again', canvas.width/2, canvas.height/2 + 100);
        
        // Reset text alignment
        ctx.textAlign = 'left';
    }

    update() {
        // Update current state
        switch (this.currentState) {
            case 'playing':
                // Player updates are handled in the player class
                break;
                
            case 'levelComplete':
                // No updates needed during completion screen
                break;
        }
    }
}

// Global game state manager instance
const gameStateManager = new GameStateManager();