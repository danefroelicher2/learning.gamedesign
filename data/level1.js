// Level 1: The Pound - ACTUALLY Descending Staircase (High to Low)
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

    // SECTION 5: ACTUALLY DESCENDING STAIRCASE (HIGH TO LOW!)
    { x: 1700, y: 200, width: 100, height: 20, type: "platform" }, // START HIGH (200px)
    { x: 1950, y: 240, width: 100, height: 20, type: "platform" }, // Down to 240px
    { x: 2200, y: 280, width: 100, height: 20, type: "platform" }, // Down to 280px
    { x: 2450, y: 320, width: 100, height: 20, type: "platform" }, // Down to 320px
    { x: 2700, y: 360, width: 100, height: 20, type: "platform" }, // Down to 360px (lowest)

    // SECTION 6: Bridge platform to spike area (at ground level)
    { x: 2900, y: 350, width: 200, height: 20, type: "platform" },

    // SECTION 7: Extended running section
    { x: 3200, y: 370, width: 600, height: 30, type: "ground" },

    // SECTION 8: SPIKE ROLLER CHALLENGE AREA
    // Multi-level platform section with moving spike rollers
    { x: 3900, y: 370, width: 200, height: 30, type: "ground" }, // Entry platform
    { x: 4200, y: 320, width: 150, height: 20, type: "platform" }, // Lower platform
    { x: 4450, y: 270, width: 150, height: 20, type: "platform" }, // Middle platform
    { x: 4700, y: 220, width: 150, height: 20, type: "platform" }, // Upper platform
    { x: 4950, y: 320, width: 150, height: 20, type: "platform" }, // Down again
    { x: 5200, y: 370, width: 200, height: 30, type: "ground" }, // Exit platform

    // SECTION 9: Another long running section
    { x: 5500, y: 370, width: 1000, height: 30, type: "ground" },

    // SECTION 10: Elevated jumping section
    { x: 6600, y: 320, width: 100, height: 20, type: "platform" },
    { x: 6800, y: 280, width: 100, height: 20, type: "platform" },
    { x: 7000, y: 240, width: 100, height: 20, type: "platform" },
    { x: 7200, y: 280, width: 100, height: 20, type: "platform" },
    { x: 7400, y: 320, width: 100, height: 20, type: "platform" },
    { x: 7600, y: 370, width: 300, height: 30, type: "ground" },

    // SECTION 11: Final approach to boss (massive running section)
    { x: 8000, y: 370, width: 2000, height: 30, type: "ground" },

    // SECTION 12: Boss Arena (moved much further right)
    { x: 10100, y: 370, width: 1200, height: 30, type: "ground" },

    // SECTION 13: Final stretch to flag (after boss defeat)
    { x: 11400, y: 370, width: 400, height: 30, type: "ground" },
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

    // SECTION 5: DESCENDING STAIRCASE CANNONEERS (positioned to hit descending player)
    {
      x: 1800,
      y: 380, // Ground level, targeting first descent
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2000,
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2050,
      y: 380, // Ground level, targeting second descent
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2400,
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2300,
      y: 380, // Ground level, targeting third descent
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1800,
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 2550,
      y: 380, // Ground level, targeting fourth descent
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2200,
        range: 600,
        shootUp: true,
      },
    },

    // SECTION 8: SPIKE ROLLER MOBS - Moving deadly obstacles
    {
      x: 4200,
      y: 290, // On the lower platform
      type: "spikeRoller",
      config: {
        platformStart: 4200,
        platformEnd: 4350,
        speed: 3,
        direction: 1,
      },
    },
    {
      x: 4700,
      y: 190, // On the upper platform
      type: "spikeRoller",
      config: {
        platformStart: 4700,
        platformEnd: 4850,
        speed: 2.5,
        direction: -1,
      },
    },
    {
      x: 4950,
      y: 290, // On the exit platform
      type: "spikeRoller",
      config: {
        platformStart: 4950,
        platformEnd: 5100,
        speed: 3.5,
        direction: 1,
      },
    },

    // SECTION 10: Additional cannoneer in the elevated section
    {
      x: 7100,
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
      x: 10700,
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
  goal: { x: 11750, y: 340, width: 30, height: 30 }, // Much further right after expanded map
  playerStart: { x: 50, y: 300 },
  bossArena: {
    x: 10100, // Arena start (moved much further right)
    width: 1200, // Large width to cover full screen
    respawnX: 10200, // Respawn inside the arena
    respawnY: 300, // Respawn Y position
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
