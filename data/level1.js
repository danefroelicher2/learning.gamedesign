// Level 1: The Pound - ENHANCED EPIC VERSION
const LEVEL_1 = {
  id: 1,
  name: "Level 1 - The Pound",
  platforms: [
    // SECTION 1: TUTORIAL AREA - Easy introduction (0-5%)
    { x: 0, y: 370, width: 200, height: 30, type: "ground" },
    { x: 250, y: 320, width: 100, height: 20, type: "platform" },
    { x: 400, y: 280, width: 100, height: 20, type: "platform" },
    { x: 550, y: 240, width: 100, height: 20, type: "platform" },

    // SECTION 2: FIRST CHALLENGE - Cannoneer introduction (5-15%)
    { x: 700, y: 300, width: 120, height: 20, type: "platform" },
    { x: 900, y: 280, width: 80, height: 20, type: "platform" },
    { x: 1050, y: 240, width: 80, height: 20, type: "platform" },
    { x: 1200, y: 200, width: 100, height: 20, type: "platform" },

    // SECTION 3: PRECISION JUMPING GAUNTLET (15-25%)
    { x: 1400, y: 280, width: 60, height: 15, type: "platform" }, // Smaller platforms
    { x: 1520, y: 320, width: 60, height: 15, type: "platform" },
    { x: 1640, y: 260, width: 60, height: 15, type: "platform" },
    { x: 1760, y: 300, width: 60, height: 15, type: "platform" },
    { x: 1880, y: 240, width: 80, height: 20, type: "platform" },

    // SECTION 4: MOVING PLATFORM SIMULATION (Static but positioned like moving) (25-35%)
    { x: 2000, y: 350, width: 80, height: 15, type: "platform" },
    { x: 2150, y: 280, width: 80, height: 15, type: "platform" },
    { x: 2300, y: 350, width: 80, height: 15, type: "platform" },
    { x: 2450, y: 220, width: 80, height: 15, type: "platform" },
    { x: 2600, y: 320, width: 100, height: 20, type: "platform" },

    // SECTION 5: SPIKE ROLLER INTRODUCTION (35-40%)
    { x: 2800, y: 350, width: 200, height: 30, type: "ground" },
    { x: 3050, y: 300, width: 150, height: 20, type: "platform" },
    { x: 3250, y: 250, width: 150, height: 20, type: "platform" },

    // SECTION 6: FIRST CHECKPOINT AREA (40-45%)
    { x: 3500, y: 350, width: 250, height: 30, type: "ground" }, // Safe area

    // SECTION 7: THE GREAT DESCENT BEGINS (45-55%)
    { x: 3850, y: 420, width: 90, height: 20, type: "platform" },
    { x: 4000, y: 500, width: 90, height: 20, type: "platform" },
    { x: 4150, y: 580, width: 90, height: 20, type: "platform" },
    { x: 4300, y: 660, width: 90, height: 20, type: "platform" },
    { x: 4450, y: 740, width: 90, height: 20, type: "platform" },
    { x: 4600, y: 820, width: 90, height: 20, type: "platform" },
    { x: 4750, y: 900, width: 90, height: 20, type: "platform" },
    { x: 4900, y: 980, width: 90, height: 20, type: "platform" },

    // SECTION 8: UNDERGROUND NETWORK (55-65%)
    { x: 5100, y: 1050, width: 300, height: 30, type: "ground" }, // Landing area
    { x: 5500, y: 1000, width: 100, height: 20, type: "platform" },
    { x: 5700, y: 950, width: 100, height: 20, type: "platform" },
    { x: 5900, y: 1000, width: 100, height: 20, type: "platform" },
    { x: 6100, y: 1050, width: 200, height: 30, type: "ground" },

    // SECTION 9: SECOND CHECKPOINT (65-70%)
    { x: 6400, y: 1050, width: 300, height: 30, type: "ground" },

    // SECTION 10: SPIKE GAUNTLET SUPREME (70-80%)
    { x: 6800, y: 1050, width: 180, height: 30, type: "ground" },
    { x: 7050, y: 1000, width: 160, height: 20, type: "platform" },
    { x: 7280, y: 950, width: 160, height: 20, type: "platform" },
    { x: 7510, y: 1000, width: 160, height: 20, type: "platform" },
    { x: 7740, y: 950, width: 160, height: 20, type: "platform" },
    { x: 7970, y: 1000, width: 160, height: 20, type: "platform" },
    { x: 8200, y: 1050, width: 200, height: 30, type: "ground" },

    // SECTION 11: PRE-BOSS TENSION BUILDER (80-85%)
    { x: 8500, y: 1050, width: 150, height: 30, type: "ground" },
    { x: 8750, y: 1000, width: 100, height: 20, type: "platform" },
    { x: 8950, y: 950, width: 100, height: 20, type: "platform" },
    { x: 9150, y: 1000, width: 100, height: 20, type: "platform" },
    { x: 9350, y: 1050, width: 200, height: 30, type: "ground" },

    // SECTION 12: BOSS ARENA ENTRANCE (85-90%)
    { x: 9650, y: 1050, width: 300, height: 30, type: "ground" },

    // SECTION 13: IRON GIANT BOSS ARENA (90-99%)
    { x: 10050, y: 1050, width: 1400, height: 30, type: "ground" }, // Massive boss arena

    // SECTION 14: VICTORY LAP (99-100%)
    { x: 11550, y: 1050, width: 400, height: 30, type: "ground" },
  ],
  mobs: [
    // SECTION 2: TUTORIAL CANNONEERS (Slower, easier)
    {
      x: 850,
      y: 250,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 4000, // Slower for tutorial
        range: 400,
      },
    },

    // SECTION 3: PRECISION GAUNTLET CANNONEERS
    {
      x: 1300,
      y: 150,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 3000,
        range: 500,
      },
    },
    {
      x: 1580,
      y: 200,
      type: "cannoneer",
      config: {
        direction: 1, // Shooting right
        fireRate: 2800,
        range: 400,
      },
    },

    // SECTION 4: CROSSFIRE CANNONEERS
    {
      x: 2100,
      y: 180,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2500,
        range: 600,
      },
    },
    {
      x: 2550,
      y: 120,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2200,
        range: 500,
      },
    },

    // SECTION 5: FIRST SPIKE ROLLERS
    {
      x: 3050,
      y: 270,
      type: "spikeRoller",
      config: {
        platformStart: 3050,
        platformEnd: 3200,
        speed: 2.5,
        direction: 1,
      },
    },
    {
      x: 3250,
      y: 220,
      type: "spikeRoller",
      config: {
        platformStart: 3250,
        platformEnd: 3400,
        speed: 2.2,
        direction: -1,
      },
    },

    // SECTION 7: DESCENT WATCHERS (Cannoneers positioned to guard descent)
    {
      x: 3700,
      y: 200,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 3500,
        range: 800,
      },
    },
    {
      x: 4050,
      y: 1100, // At bottom shooting up
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2000,
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 4200,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 2400,
        range: 600,
        shootUp: true,
      },
    },
    {
      x: 4350,
      y: 1100,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1800,
        range: 600,
        shootUp: true,
      },
    },

    // SECTION 8: UNDERGROUND DEFENDERS
    {
      x: 5550,
      y: 970,
      type: "spikeRoller",
      config: {
        platformStart: 5500,
        platformEnd: 5600,
        speed: 3,
        direction: 1,
      },
    },
    {
      x: 5700,
      y: 920,
      type: "spikeRoller",
      config: {
        platformStart: 5700,
        platformEnd: 5800,
        speed: 2.8,
        direction: -1,
      },
    },
    {
      x: 5950,
      y: 970,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2000,
        range: 400,
      },
    },

    // SECTION 10: SPIKE GAUNTLET SUPREME - The real challenge
    {
      x: 7050,
      y: 970,
      type: "spikeRoller",
      config: {
        platformStart: 7050,
        platformEnd: 7210,
        speed: 3.2,
        direction: 1,
      },
    },
    {
      x: 7280,
      y: 920,
      type: "spikeRoller",
      config: {
        platformStart: 7280,
        platformEnd: 7440,
        speed: 2.9,
        direction: -1,
      },
    },
    {
      x: 7510,
      y: 970,
      type: "spikeRoller",
      config: {
        platformStart: 7510,
        platformEnd: 7670,
        speed: 3.5,
        direction: 1,
      },
    },
    {
      x: 7740,
      y: 920,
      type: "spikeRoller",
      config: {
        platformStart: 7740,
        platformEnd: 7900,
        speed: 3.1,
        direction: -1,
      },
    },
    {
      x: 7970,
      y: 970,
      type: "spikeRoller",
      config: {
        platformStart: 7970,
        platformEnd: 8130,
        speed: 3.3,
        direction: 1,
      },
    },

    // SECTION 11: PRE-BOSS FINAL CHALLENGE
    {
      x: 8800,
      y: 970,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 1500, // Fast firing
        range: 600,
      },
    },
    {
      x: 9000,
      y: 920,
      type: "cannoneer",
      config: {
        direction: 1,
        fireRate: 1600,
        range: 500,
      },
    },
    {
      x: 9200,
      y: 970,
      type: "spikeRoller",
      config: {
        platformStart: 9150,
        platformEnd: 9250,
        speed: 4, // Fastest spike roller
        direction: -1,
      },
    },

    // SECTION 13: THE IRON GIANT BOSS
    {
      x: 10600,
      y: 1000,
      type: "ironGiant",
      config: {
        health: 5, // Increased health for enhanced difficulty
        patrolDistance: 800, // Larger patrol area
        attackRate: 1200, // Faster attacks
        isBoss: true,
      },
    },

    // SECTION 13: BOSS ARENA MINIONS (Spawn during boss fight)
    {
      x: 10200,
      y: 1020,
      type: "spikeRoller",
      config: {
        platformStart: 10100,
        platformEnd: 10300,
        speed: 2,
        direction: 1,
      },
    },
    {
      x: 11200,
      y: 1020,
      type: "spikeRoller",
      config: {
        platformStart: 11100,
        platformEnd: 11300,
        speed: 2,
        direction: -1,
      },
    },
  ],
  collectibles: [
    // FIRST CHECKPOINT (After spike introduction)
    {
      x: 3600,
      y: 310,
      type: "checkpoint",
      width: 30,
      height: 40,
    },
    // SECOND CHECKPOINT (After descent)
    {
      x: 6500,
      y: 1010,
      type: "checkpoint",
      width: 30,
      height: 40,
    },
  ],
  goal: { x: 11800, y: 1020, width: 30, height: 30 },
  playerStart: { x: 50, y: 300 },
  checkpointReached: false,
  checkpointPosition: { x: 3600, y: 300 }, // First checkpoint position
  secondCheckpointReached: false, // New: track second checkpoint
  secondCheckpointPosition: { x: 6500, y: 1000 }, // Second checkpoint position
  bossArena: {
    x: 10050,
    width: 1400,
    respawnX: 10150,
    respawnY: 1000,
    triggered: false,
  },
  background: {
    color1: "#87CEEB", // Sky blue
    color2: "#2c3e50", // Dark blue-gray (more ominous as you descend)
  },
  // PROGRESS TRACKING
  progressMarkers: {
    0: 0, // Start
    1400: 15, // After first challenges
    2600: 35, // Before first spike area
    3750: 45, // First checkpoint
    5100: 65, // After descent
    6700: 70, // Second checkpoint
    8200: 80, // After spike gauntlet
    9650: 85, // Boss arena entrance
    10050: 90, // Boss fight starts
    11550: 99, // Boss defeated, victory lap
    11800: 100, // Goal reached
  },
};
