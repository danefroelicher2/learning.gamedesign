// Combined levels array - imports all individual level files
// This file combines all levels into the LEVELS array that the game expects

const LEVELS = [
  LEVEL_1, // From level1.js
  LEVEL_2, // From level2.js
  LEVEL_3, // From level3.js
];

// World map configuration
const WORLD_MAP_CONFIG = {
  nodes: [
    {
      id: 1,
      x: 100,
      y: 300,
      levelIndex: 0,
      unlocked: true,
      completed: false,
    },
    {
      id: 2,
      x: 300,
      y: 250,
      levelIndex: 1,
      unlocked: false,
      completed: false,
    },
    {
      id: 3,
      x: 500,
      y: 300,
      levelIndex: 2,
      unlocked: false,
      completed: false,
    },
  ],
  paths: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
  ],
  playerStartPosition: 0,
};
