// Level 1: The Pound - Checkpoint Flag and Reworked Spike Section
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
    { x: 1540, y: 350, width: 80, height: 20, type: "platform" }, // Player is here at y: 350

    // SECTION 5: DEEP PIT DESCENT (Going WAY below screen level)
    { x: 1700, y: 420, width: 100, height: 20, type: "platform" }, // Platform 1: 70px down
    { x: 1850, y: 490, width: 100, height: 20, type: "platform" }, // Platform 2: 70px down
    { x: 2000, y: 560, width: 100, height: 20, type: "platform" }, // Platform 3: 70px down
    { x: 2150, y: 630, width: 100, height: 20, type: "platform" }, // Platform 4: 70px down (below normal screen)
    { x: 2300, y: 700, width: 100, height: 20, type: "platform" }, // Platform 5: 70px down (deep below)
    { x: 2450, y: 770, width: 100, height: 20, type: "platform" }, // Platform 6: 70px down (deeper)
    { x: 2600, y: 840, width: 100, height: 20, type: "platform" }, // Platform 7: 70px down (very deep)
    { x: 2750, y: 910, width: 100, height: 20, type: "platform" }, // Platform 8: 70px down (extremely deep)
    { x: 2900, y: 980, width: 100, height: 20, type: "platform" }, // Platform 9: 70px down (deepest pit)
    { x: 3050, y: 1050, width: 100, height: 20, type: "platform" }, // Platform 10: 70px down (bottom of pit)

    // SECTION 6: CHECKPOINT AREA (Safe zone after descent)
    { x: 3250, y: 1050, width: 300, height: 30, type: "ground" }, // Checkpoint platform (larger safe area)

    // SECTION 7: REWORKED SPIKE ROLLER CHALLENGE AREA (Larger platforms, easier navigation)
    { x: 3650, y: 1050, width: 200, height: 30, type: "ground" }, // Entry to spike area
    { x: 3950, y: 1000, width: 200, height: 20, type: "platform" }, // Spike platform 1 (larger)
    { x: 4250, y: 950, width: 200, height: 20, type: "platform" }, // Spike platform 2 (larger)
    { x: 4550, y: 900, width: 200, height: 20, type: "platform" }, // Spike platform 3 (larger)
    { x: 4850, y: 950, width: 200, height: 20, type: "platform" }, // Spike platform 4 (larger)
    { x: 5150, y: 1000, width: 200, height: 20, type: "platform" }, // Spike platform 5 (larger)
    { x: 5450, y: 1050, width: 200, height: 30, type: "ground" }, // Exit spike area

    // SECTION 8: Transition to Boss Arena
    { x: 5750, y: 1050, width: 300, height: 30, type: "ground" }, // Bridge to boss

    // SECTION 9: BOSS ARENA (Deep underground level)
    { x: 6150, y: 1050, width: 1200, height: 30, type: "ground" }, // Boss arena floor (deep level)

    // SECTION 10: Final stretch to flag (after boss defeat)
    { x: 7450, y: 1050, width: 400, height: 30, type: "ground" }, // Goal area (same deep level)
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

    // SECTION 5: DEEP PIT DESCENT CANNONEERS
    {
      x: 1775,
      y: 1100, // Way below at bottom of pit, shooting UP
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2000,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 1925,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2400,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2075,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1800,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2225,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2200,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2375,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1900,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2525,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2100,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2675,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1700,
        range: 800,
        shootUp: true,
      },
    },
    {
      x: 2825,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2300,
        range: 800,
        shootUp: true,
      },
    },

    // SECTION 7: REWORKED SPIKE ROLLER MOBS (Slower, more predictable)
    {
      x: 3950,
      y: 970, // On larger spike platform 1
      type: "spikeRoller",
      config: {
        platformStart: 3950,
        platformEnd: 4150, // Larger patrol area
        speed: 2, // Slower speed
        direction: 1,
      },
    },
    {
      x: 4250,
      y: 920, // On larger spike platform 2
      type: "spikeRoller",
      config: {
        platformStart: 4250,
        platformEnd: 4450, // Larger patrol area
        speed: 1.8, // Slower speed
        direction: -1,
      },
    },
    {
      x: 4550,
      y: 870, // On larger spike platform 3
      type: "spikeRoller",
      config: {
        platformStart: 4550,
        platformEnd: 4750, // Larger patrol area
        speed: 2.2, // Slower speed
        direction: 1,
      },
    },
    {
      x: 4850,
      y: 920, // On larger spike platform 4
      type: "spikeRoller",
      config: {
        platformStart: 4850,
        platformEnd: 5050, // Larger patrol area
        speed: 1.9, // Slower speed
        direction: -1,
      },
    },
    {
      x: 5150,
      y: 970, // On larger spike platform 5
      type: "spikeRoller",
      config: {
        platformStart: 5150,
        platformEnd: 5350, // Larger patrol area
        speed: 2.1, // Slower speed
        direction: 1,
      },
    },

    // SECTION 9: BOSS MOB - Iron Giant (Deep underground boss arena)
    {
      x: 6700,
      y: 1000, // In the deep boss arena
      type: "ironGiant",
      config: {
        health: 3,
        patrolDistance: 600,
        attackRate: 1500,
        isBoss: true,
      },
    },
  ],
  collectibles: [
    // CHECKPOINT FLAG (after descent, before spikes)
    {
      x: 3400,
      y: 1010,
      type: "checkpoint",
      width: 30,
      height: 40,
    },
  ],
  goal: { x: 7800, y: 1020, width: 30, height: 30 }, // Goal at deep level after boss
  playerStart: { x: 50, y: 300 },
  checkpointReached: false, // Track if checkpoint has been reached
  checkpointPosition: { x: 3400, y: 1000 }, // Where to respawn after checkpoint
  bossArena: {
    x: 6150, // Boss arena start (deep underground)
    width: 1200, // Large width to cover full screen
    respawnX: 6250, // Respawn inside the deep arena
    respawnY: 1000, // Respawn Y position (deep level)
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#98FB98", // Light green
  },
};
