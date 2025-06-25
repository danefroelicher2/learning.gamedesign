// Level 3: Final Challenge - Original design maintained
const LEVEL_3 = {
  id: 3,
  name: "Final Challenge",
  platforms: [
    { x: 0, y: 370, width: 120, height: 30, type: "ground" },
    { x: 180, y: 280, width: 80, height: 20, type: "platform" },
    { x: 320, y: 320, width: 60, height: 20, type: "platform" },
    { x: 450, y: 200, width: 100, height: 20, type: "platform" },
    { x: 650, y: 280, width: 150, height: 20, type: "ground" },
  ],
  mobs: [
    // Multiple cannoneers creating a gauntlet
    {
      x: 380,
      y: 290,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2000, // Faster firing
        range: 350,
      },
    },
    {
      x: 550,
      y: 170,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 2200,
        range: 400,
      },
    },
    {
      x: 720,
      y: 250,
      type: "cannoneer",
      config: {
        direction: -1,
        fireRate: 1800, // Even faster
        range: 500,
      },
    },
  ],
  collectibles: [],
  goal: { x: 700, y: 250, width: 30, height: 30 },
  playerStart: { x: 30, y: 300 },
  background: {
    color1: "#DDA0DD", // Plum
    color2: "#98FB98", // Light green
  },
};
