// Death Counter System - tracks player deaths during session
class DeathCounter {
  constructor() {
    this.deathCount = 0;
    this.createUI();
  }

  createUI() {
    // Create the main game UI container
    const gameUI = document.createElement("div");
    gameUI.className = "game-ui";
    gameUI.id = "gameUI";

    // Create level header
    const levelHeader = document.createElement("div");
    levelHeader.id = "levelHeader";
    levelHeader.textContent = "World Map";

    // Create death counter display
    const deathDisplay = document.createElement("div");
    deathDisplay.id = "deathCounter";

    // Append to game UI container
    gameUI.appendChild(levelHeader);
    gameUI.appendChild(deathDisplay);

    // Add to page
    document.body.appendChild(gameUI);

    // Initialize display
    this.updateDisplay();
  }

  addDeath() {
    this.deathCount++;
    this.updateDisplay();
    console.log(`Player died! Total deaths: ${this.deathCount}`);
  }

  updateDisplay() {
    const deathDisplay = document.getElementById("deathCounter");
    if (deathDisplay) {
      deathDisplay.textContent = `💀 Deaths: ${this.deathCount}`;
    }
  }

  updateLevelHeader(levelName) {
    const levelHeader = document.getElementById("levelHeader");
    if (levelHeader) {
      levelHeader.textContent = levelName;
    }
  }

  reset() {
    this.deathCount = 0;
    this.updateDisplay();
  }

  getDeathCount() {
    return this.deathCount;
  }
}

// Global death counter instance
const deathCounter = new DeathCounter();
