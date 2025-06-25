// Level 2: Level Two - Original design maintained
const LEVEL_2 = {
  id: 2,
  name: "Level Two",
  platforms: [
    { x: 0, y: 370, width: 100, height: 30, type: "ground" },
    { x: 200, y: 300, width: 100, height: 20, type: "platform" },
    { x: 400, y: 350, width: 80, height: 20, type: "platform" },
    { x: 550, y: 250, width: 100, height: 20, type: "platform" },
    { x: 700, y: 300, width: 100, height: 20, type: "ground" },
  ],
  mobs: [
    // Two cannoneers for increased difficulty
    {
      x: 480,
      y: 220,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2500,
        range: 400,
      },
    },
    {
      x: 620,
      y: 270,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2800, // Slightly different timing
        range: 500,
      },
    },
  ],
  collectibles: [],
  goal: { x: 730, y: 270, width: 30, height: 30 },
  playerStart: { x: 30, y: 300 },
  background: {
    color1: "#FFB6C1", // Light pink
    color2: "#98FB98", // Light green
  },
};
