// Input handling system
class InputManager {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.handleSpecialKeys(e.code);
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    handleSpecialKeys(keyCode) {
        // Handle world map specific inputs
        if (gameStateManager.currentState === 'worldMap') {
            worldMap.handleInput(keyCode);
        }
    }

    // Check if a key is currently pressed
    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }

    // Check multiple keys at once
    isAnyKeyPressed(keyCodes) {
        return keyCodes.some(keyCode => this.isKeyPressed(keyCode));
    }

    // Movement helper methods
    isLeftPressed() {
        return this.isAnyKeyPressed(['KeyA', 'ArrowLeft']);
    }

    isRightPressed() {
        return this.isAnyKeyPressed(['KeyD', 'ArrowRight']);
    }

    isJumpPressed() {
        return this.isAnyKeyPressed(['KeyW', 'ArrowUp', 'Space']);
    }

    isActionPressed() {
        return this.isAnyKeyPressed(['Enter', 'Space']);
    }
}

// Global input manager instance
const inputManager = new InputManager();