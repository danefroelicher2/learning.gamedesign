// Level data - easily expandable for complex levels
const LEVELS = [
    {
        id: 1,
        name: "Getting Started",
        platforms: [
            {x: 0, y: 370, width: 200, height: 30, type: "ground"},
            {x: 300, y: 320, width: 150, height: 20, type: "platform"},
            {x: 550, y: 270, width: 150, height: 20, type: "platform"},
            {x: 750, y: 350, width: 50, height: 50, type: "ground"}
        ],
        enemies: [
            // Future: {x: 400, y: 290, type: "goomba", direction: 1}
        ],
        collectibles: [
            // Future: {x: 375, y: 280, type: "coin", value: 100}
        ],
        goal: {x: 760, y: 320, width: 30, height: 30},
        playerStart: {x: 50, y: 300},
        background: {
            color1: "#87CEEB", // Sky blue
            color2: "#98FB98"  // Light green
        }
    },
    {
        id: 2,
        name: "Level Two",
        platforms: [
            {x: 0, y: 370, width: 100, height: 30, type: "ground"},
            {x: 200, y: 300, width: 100, height: 20, type: "platform"},
            {x: 400, y: 350, width: 80, height: 20, type: "platform"},
            {x: 550, y: 250, width: 100, height: 20, type: "platform"},
            {x: 700, y: 300, width: 100, height: 20, type: "ground"}
        ],
        enemies: [],
        collectibles: [],
        goal: {x: 730, y: 270, width: 30, height: 30},
        playerStart: {x: 30, y: 300},
        background: {
            color1: "#FFB6C1", // Light pink
            color2: "#98FB98"  // Light green
        }
    },
    {
        id: 3,
        name: "Final Challenge",
        platforms: [
            {x: 0, y: 370, width: 120, height: 30, type: "ground"},
            {x: 180, y: 280, width: 80, height: 20, type: "platform"},
            {x: 320, y: 320, width: 60, height: 20, type: "platform"},
            {x: 450, y: 200, width: 100, height: 20, type: "platform"},
            {x: 650, y: 280, width: 150, height: 20, type: "ground"}
        ],
        enemies: [],
        collectibles: [],
        goal: {x: 700, y: 250, width: 30, height: 30},
        playerStart: {x: 30, y: 300},
        background: {
            color1: "#DDA0DD", // Plum
            color2: "#98FB98"  // Light green
        }
    }
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
            completed: false
        },
        {
            id: 2,
            x: 300,
            y: 250,
            levelIndex: 1,
            unlocked: false,
            completed: false
        },
        {
            id: 3,
            x: 500,
            y: 300,
            levelIndex: 2,
            unlocked: false,
            completed: false
        }
    ],
    paths: [
        {from: 0, to: 1},
        {from: 1, to: 2}
    ],
    playerStartPosition: 0
};