// World Map management
class WorldMap {
    constructor() {
        this.nodes = [...WORLD_MAP_CONFIG.nodes]; // Copy the config
        this.paths = [...WORLD_MAP_CONFIG.paths];
        this.playerPosition = WORLD_MAP_CONFIG.playerStartPosition;
    }

    handleInput(keyCode) {
        const currentPos = this.playerPosition;
        const currentNode = this.nodes[currentPos];
        
        if (keyCode === 'Enter' || keyCode === 'Space') {
            // Enter level if it's unlocked
            if (currentNode.unlocked) {
                levelManager.startLevel(currentNode.levelIndex);
            }
        }
        
        // Navigate between nodes
        if (keyCode === 'KeyD' || keyCode === 'ArrowRight') {
            this.moveToNextNode();
        }
        
        if (keyCode === 'KeyA' || keyCode === 'ArrowLeft') {
            this.moveToPreviousNode();
        }
    }

    moveToNextNode() {
        const currentPos = this.playerPosition;
        
        for (let path of this.paths) {
            if (path.from === currentPos) {
                const nextNode = this.nodes[path.to];
                if (nextNode.unlocked) {
                    this.playerPosition = path.to;
                }
                break;
            }
        }
    }

    moveToPreviousNode() {
        const currentPos = this.playerPosition;
        
        for (let path of this.paths) {
            if (path.to === currentPos) {
                this.playerPosition = path.from;
                break;
            }
        }
    }

    completeLevel(levelIndex) {
        // Find the node for this level and mark it complete
        const completedNode = this.nodes.find(node => node.levelIndex === levelIndex);
        if (completedNode) {
            completedNode.completed = true;
        }

        // Unlock the next level
        this.unlockNextLevel();
    }

    unlockNextLevel() {
        const currentPos = this.playerPosition;
        
        for (let path of this.paths) {
            if (path.from === currentPos) {
                this.nodes[path.to].unlocked = true;
                break;
            }
        }
    }

    getCurrentNode() {
        return this.nodes[this.playerPosition];
    }

    render(ctx, canvas) {
        // Clear with sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        this.drawPaths(ctx);
        this.drawNodes(ctx);
        this.drawInstructions(ctx);
    }

    drawPaths(ctx) {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 8;
        
        for (let path of this.paths) {
            const fromNode = this.nodes[path.from];
            const toNode = this.nodes[path.to];
            
            ctx.beginPath();
            ctx.moveTo(fromNode.x + 20, fromNode.y + 20);
            ctx.lineTo(toNode.x + 20, toNode.y + 20);
            ctx.stroke();
        }
    }

    drawNodes(ctx) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            
            // Node circle
            ctx.beginPath();
            ctx.arc(node.x + 20, node.y + 20, 25, 0, Math.PI * 2);
            
            // Color based on state
            if (node.completed) {
                ctx.fillStyle = '#2ecc71'; // Green for completed
            } else if (node.unlocked) {
                ctx.fillStyle = '#f39c12'; // Orange for available
            } else {
                ctx.fillStyle = '#95a5a6'; // Gray for locked
            }
            ctx.fill();
            
            // Border
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Level number
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(node.id.toString(), node.x + 20, node.y + 27);
            
            // Player indicator
            if (i === this.playerPosition) {
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(node.x + 10, node.y - 15, 20, 20);
                
                // Show level name
                ctx.fillStyle = 'white';
                ctx.font = '14px Arial';
                const levelName = LEVELS[node.levelIndex].name;
                ctx.fillText(levelName, node.x + 20, node.y - 25);
            }
        }
    }

    drawInstructions(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 300, 80);
        
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('A/D: Move between levels', 20, 30);
        ctx.fillText('Enter/Space: Enter level', 20, 50);
        
        const currentNode = this.getCurrentNode();
        if (!currentNode.unlocked) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillText('Level locked!', 20, 70);
        }
    }
}

// Global world map instance
const worldMap = new WorldMap();