// Death Counter System - tracks player deaths during session
class DeathCounter {
  constructor() {
    this.deathCount = 0;
    this.createUI();
  }

  createUI() {
    // Create death counter display element
    const deathDisplay = document.createElement("div");
    deathDisplay.id = "deathCounter";
    deathDisplay.style.position = "absolute";
    deathDisplay.style.top = "10px";
    deathDisplay.style.left = "10px";
    deathDisplay.style.color = "#e74c3c";
    deathDisplay.style.fontSize = "18px";
    deathDisplay.style.fontWeight = "bold";
    deathDisplay.style.fontFamily = "Arial, sans-serif";
    deathDisplay.style.zIndex = "20";
    deathDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    deathDisplay.style.padding = "5px 10px";
    deathDisplay.style.borderRadius = "5px";
    deathDisplay.style.border = "2px solid #c0392b";

    // Add to page
    document.body.appendChild(deathDisplay);

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
