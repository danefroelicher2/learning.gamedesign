// Level 1: The Pound - FIXED Descending Staircase Section
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

    // SECTION 3: The 3-jump ASCENDING challenge with two cannoneers
    { x: 1000, y: 280, width: 80, height: 20, type: "platform" }, // Jump 1
    { x: 1180, y: 240, width: 80, height: 20, type: "platform" }, // Jump 2
    { x: 1360, y: 200, width: 80, height: 20, type: "platform" }, // Jump 3

    // SECTION 4: Landing platform after the 3 jumps (SHORTENED FOR BREATHER)
    { x: 1540, y: 350, width: 80, height: 20, type: "platform" }, // Smaller breather platform

    // SECTION 5: FIXED DESCENDING STAIRCASE SECTION (Going DOWN with more space)
    { x: 1700, y: 320, width: 100, height: 20, type: "platform" }, // Start descent (high)
    { x: 1950, y: 280, width: 100, height: 20, type: "platform" }, // Down 1 (40px down, 250px apart)
    { x: 2200, y: 240, width: 100, height: 20, type: "platform" }, // Down 2 (40px down, 250px apart)
    { x: 2450, y: 200, width: 100, height: 20, type: "platform" }, // Down 3 (40px down, 250px apart)
    { x: 2700, y: 160, width: 100, height: 20, type: "platform" }, // Down 4 (40px down, 250px apart)
    { x: 2950, y: 120, width: 100, height: 20, type: "platform" }, // Down 5 (lowest point)

    // SECTION 6: Bridge platform to spike area (at ground level)
    { x: 3200, y: 350, width: 200, height: 20, type: "platform" },

    // SECTION 7: Extended running section
    { x: 3500, y: 370, width: 600, height: 30, type: "ground" },

    // SECTION 8: SPIKE ROLLER CHALLENGE AREA
    // Multi-level platform section with moving spike rollers
    { x: 4200, y: 370, width: 200, height: 30, type: "ground" }, // Entry platform
    { x: 4500, y: 320, width: 150, height: 20, type: "platform" }, // Lower platform
    { x: 4750, y: 270, width: 150, height: 20, type: "platform" }, // Middle platform
    { x: 5000, y: 220, width: 150, height: 20, type: "platform" }, // Upper platform
    { x: 5250, y: 320, width: 150, height: 20, type: "platform" }, // Down again
    { x: 5500, y: 370, width: 200, height: 30, type: "ground" }, // Exit platform

    // SECTION 9: Another long running section
    { x: 5800, y: 370, width: 1000, height: 30, type: "ground" },

    // SECTION 10: Elevated jumping section
    { x: 6900, y: 320, width: 100, height: 20, type: "platform" },
    { x: 7100, y: 280, width: 100, height: 20, type: "platform" },
    { x: 7300, y: 240, width: 100, height: 20, type: "platform" },
    { x: 7500, y: 280, width: 100, height: 20, type: "platform" },
    { x: 7700, y: 320, width: 100, height: 20, type: "platform" },
    { x: 7900, y: 370, width: 300, height: 30, type: "ground" },

    // SECTION 11: Final approach to boss (massive running section)
    { x: 8300, y: 370, width: 2000, height: 30, type: "ground" },

    // SECTION 12: Boss Arena (moved much further right)
    { x: 10400, y: 370, width: 1200, height: 30, type: "ground" },

    // SECTION 13: Final stretch to flag (after boss defeat)
    { x: 11700, y: 370, width: 400, height: 30, type: "ground" },
  ],
  mobs: [
    // SECTION 3: Original cannoneers (ascending section)
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

    // SECTION 5: FIXED DESCENDING STAIRCASE CANNONEERS (positioned to hit descending player)
    {
      x: 1850,
      y: 380, // Ground level, positioned to hit player on platforms 1-2
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2000, // Fast firing
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2100,
      y: 380, // Ground level, positioned to hit player on platforms 2-3
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2300, // Different timing
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2350,
      y: 380, // Ground level, positioned to hit player on platforms 3-4
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1800, // Even faster
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2600,
      y: 380, // Ground level, positioned to hit player on platforms 4-5
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2100,
        range: 600,
        shootUp: true,
      },
    },

    // SECTION 8: SPIKE ROLLER MOBS - Moving deadly obstacles
    {
      x: 4500,
      y: 290, // On the lower platform
      type: "spikeRoller",
      config: {
        platformStart: 4500,
        platformEnd: 4650,
        speed: 3,
        direction: 1,
      },
    },
    {
      x: 5000,
      y: 190, // On the upper platform
      type: "spikeRoller",
      config: {
        platformStart: 5000,
        platformEnd: 5150,
        speed: 2.5,
        direction: -1,
      },
    },
    {
      x: 5250,
      y: 290, // On the exit platform
      type: "spikeRoller",
      config: {
        platformStart: 5250,
        platformEnd: 5400,
        speed: 3.5,
        direction: 1,
      },
    },

    // SECTION 10: Additional cannoneer in the elevated section
    {
      x: 7400,
      y: 210,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2200,
        range: 500,
      },
    },

    // SECTION 12: BOSS MOB - Iron Giant (moved much further right)
    {
      x: 11000,
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
  goal: { x: 12050, y: 340, width: 30, height: 30 }, // Much further right after expanded map
  playerStart: { x: 50, y: 300 },
  bossArena: {
    x: 10400, // Arena start (moved much further right)
    width: 1200, // Large width to cover full screen
    respawnX: 10500, // Respawn inside the arena
    respawnY: 300, // Respawn Y position
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
