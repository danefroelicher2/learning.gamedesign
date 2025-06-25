// Level 1: The Pound - MASSIVELY EXPANDED with New Spike Roller Section
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

    // SECTION 5: Extended running section
    { x: 1700, y: 370, width: 800, height: 30, type: "ground" },

    // SECTION 6: NEW SPIKE ROLLER CHALLENGE AREA
    // Multi-level platform section with moving spike rollers
    { x: 2600, y: 370, width: 200, height: 30, type: "ground" }, // Entry platform
    { x: 2900, y: 320, width: 150, height: 20, type: "platform" }, // Lower platform
    { x: 3150, y: 270, width: 150, height: 20, type: "platform" }, // Middle platform
    { x: 3400, y: 220, width: 150, height: 20, type: "platform" }, // Upper platform
    { x: 3650, y: 320, width: 150, height: 20, type: "platform" }, // Down again
    { x: 3900, y: 370, width: 200, height: 30, type: "ground" }, // Exit platform

    // SECTION 7: Another long running section
    { x: 4200, y: 370, width: 1000, height: 30, type: "ground" },

    // SECTION 8: Elevated jumping section
    { x: 5300, y: 320, width: 100, height: 20, type: "platform" },
    { x: 5500, y: 280, width: 100, height: 20, type: "platform" },
    { x: 5700, y: 240, width: 100, height: 20, type: "platform" },
    { x: 5900, y: 280, width: 100, height: 20, type: "platform" },
    { x: 6100, y: 320, width: 100, height: 20, type: "platform" },
    { x: 6300, y: 370, width: 300, height: 30, type: "ground" },

    // SECTION 9: Final approach to boss (massive running section)
    { x: 6700, y: 370, width: 2000, height: 30, type: "ground" },

    // SECTION 10: Boss Arena (moved much further right)
    { x: 8800, y: 370, width: 1200, height: 30, type: "ground" },

    // SECTION 11: Final stretch to flag (after boss defeat)
    { x: 10100, y: 370, width: 400, height: 30, type: "ground" },
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

    // NEW SPIKE ROLLER MOBS - Moving deadly obstacles
    {
      x: 2900,
      y: 290, // On the lower platform
      type: "spikeRoller",
      config: {
        platformStart: 2900,
        platformEnd: 3050,
        speed: 3,
        direction: 1,
      },
    },
    {
      x: 3400,
      y: 190, // On the upper platform
      type: "spikeRoller",
      config: {
        platformStart: 3400,
        platformEnd: 3550,
        speed: 2.5,
        direction: -1,
      },
    },
    {
      x: 3650,
      y: 290, // On the exit platform
      type: "spikeRoller",
      config: {
        platformStart: 3650,
        platformEnd: 3800,
        speed: 3.5,
        direction: 1,
      },
    },

    // Additional cannoneer in the elevated section
    {
      x: 5800,
      y: 210,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2200,
        range: 500,
      },
    },

    // BOSS MOB - Iron Giant (moved much further right)
    {
      x: 9400,
      y: 320,
      type: "ironGiant",
      config: {
        health: 3,
        patrolDistance: 600,
        attackRate: 1500,
        isBoss: true,
      },
    },
  ],
  collectibles: [],
  goal: { x: 10450, y: 340, width: 30, height: 30 }, // Much further right after expanded map
  playerStart: { x: 50, y: 300 },
  bossArena: {
    x: 8800, // Arena start (moved much further right)
    width: 1200, // Large width to cover full screen
    respawnX: 8900, // Respawn inside the arena
    respawnY: 300, // Respawn Y position
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
