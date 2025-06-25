// Level 1: The Pound - Expanded 3x with dual cannoneer challenge
const LEVEL_1 = {
  id: 1,
  name: "Level 1 - The Pound",
  platforms: [
    // SECTION 1: Original starting area
    { x: 0, y: 370, width: 200, height: 30, type: "ground" },
    { x: 300, y: 320, width: 150, height: 20, type: "platform" },
    { x: 550, y: 270, width: 150, height: 20, type: "platform" },

    // SECTION 2: After first cannoneer - transition platform (with gap for jumping)
    { x: 800, y: 320, width: 100, height: 20, type: "platform" },

    // SECTION 3: The 3-jump challenge with two cannoneers (ensure proper gaps)
    { x: 1000, y: 280, width: 80, height: 20, type: "platform" }, // Jump 1
    { x: 1180, y: 240, width: 80, height: 20, type: "platform" }, // Jump 2
    { x: 1360, y: 200, width: 80, height: 20, type: "platform" }, // Jump 3

    // SECTION 4: Landing platform after the 3 jumps (larger landing area)
    { x: 1540, y: 350, width: 120, height: 20, type: "platform" },

    // SECTION 5: Final long flat stretch (ensure continuity)
    { x: 1700, y: 370, width: 800, height: 30, type: "ground" },
  ],
  mobs: [
    // Original cannoneer (first challenge)
    {
      x: 650,
      y: 240,
      type: "cannoneer",
      config: {
        direction: -1, // Shoots left
        fireRate: 3000, // Fire every 3 seconds
        range: 600, // Can see player from this distance
      },
    },

    // Cannoneer 1 for the 3-jump section (positioned to cover jumps 1-2)
    {
      x: 1100,
      y: 250,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2500, // Slightly faster than first
        range: 400,
      },
    },

    // Cannoneer 2 for the 3-jump section (positioned to cover jumps 2-3)
    {
      x: 1280,
      y: 170,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2800, // Different timing to create complex pattern
        range: 350,
      },
    },
  ],
  collectibles: [
    // Future: {x: 375, y: 280, type: "coin", value: 100}
  ],
  goal: { x: 2450, y: 340, width: 30, height: 30 }, // At the end of the long platform
  playerStart: { x: 50, y: 300 },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
