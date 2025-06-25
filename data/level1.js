// Level 1: The Pound - Expanded with Flat Boss Arena
const LEVEL_1 = {
  id: 1,
  name: "Level 1 - The Pound",
  platforms: [
    // SECTION 1: Original starting area
    { x: 0, y: 370, width: 200, height: 30, type: "ground" },
    { x: 300, y: 320, width: 150, height: 20, type: "platform" },
    { x: 550, y: 270, width: 150, height: 20, type: "platform" },

    // SECTION 2: After first cannoneer - transition platform
    { x: 800, y: 320, width: 100, height: 20, type: "platform" },

    // SECTION 3: The 3-jump challenge with two cannoneers
    { x: 1000, y: 280, width: 80, height: 20, type: "platform" }, // Jump 1
    { x: 1180, y: 240, width: 80, height: 20, type: "platform" }, // Jump 2
    { x: 1360, y: 200, width: 80, height: 20, type: "platform" }, // Jump 3

    // SECTION 4: Landing platform after the 3 jumps
    { x: 1540, y: 350, width: 120, height: 20, type: "platform" },

    // SECTION 5: Extended flat stretch before boss (much longer)
    { x: 1700, y: 370, width: 1200, height: 30, type: "ground" },

    // SECTION 6: Boss Arena - COMPLETELY FLAT (no walls!)
    { x: 3000, y: 370, width: 800, height: 30, type: "ground" },

    // SECTION 7: Final stretch to flag (after boss defeat)
    { x: 3900, y: 370, width: 400, height: 30, type: "ground" },
  ],
  mobs: [
    // Original cannoneers (first challenges)
    {
      x: 650,
      y: 240,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 3000,
        range: 600,
      },
    },
    {
      x: 1100,
      y: 250,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2500,
        range: 400,
      },
    },
    {
      x: 1280,
      y: 170,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2800,
        range: 350,
      },
    },

    // BOSS MOB - Iron Giant (center of boss arena)
    {
      x: 3400,
      y: 320,
      type: "ironGiant",
      config: {
        health: 3, // Takes 3 jumps to defeat
        patrolDistance: 300, // Moves back and forth
        attackRate: 1500, // Faster attacks than cannoneers
        isBoss: true,
      },
    },
  ],
  collectibles: [],
  goal: { x: 4250, y: 340, width: 30, height: 30 }, // After the boss arena
  playerStart: { x: 50, y: 300 },
  bossArena: {
    x: 3000, // Arena start
    width: 800, // Arena width
    respawnX: 3050, // Where to respawn if player dies in boss fight
    respawnY: 300, // Respawn Y position
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
