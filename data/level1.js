// Level 1: The Pound - Descent Directly to Spike Area and Boss Arena
const LEVEL_1 = {
    id: 1,
    name: "Level 1 - The Pound",
    platforms: [
        // SECTION 1: Original starting area
        {x: 0, y: 370, width: 200, height: 30, type: "ground"},
        {x: 300, y: 320, width: 150, height: 20, type: "platform"},
        {x: 550, y: 270, width: 150, height: 20, type: "platform"},
        
        // SECTION 2: After first cannoneer - transition platform
        {x: 800, y: 320, width: 100, height: 20, type: "platform"},
        
        // SECTION 3: The 3-jump ASCENDING challenge with two cannoneers
        {x: 1000, y: 280, width: 80, height: 20, type: "platform"},   // Jump 1
        {x: 1180, y: 240, width: 80, height: 20, type: "platform"},   // Jump 2  
        {x: 1360, y: 200, width: 80, height: 20, type: "platform"},   // Jump 3
        
        // SECTION 4: Landing platform after the 3 jumps (SHORTENED FOR BREATHER)
        {x: 1540, y: 350, width: 80, height: 20, type: "platform"},   // Player is here at y: 350
        
        // SECTION 5: DEEP PIT DESCENT (Going WAY below screen level)
        {x: 1700, y: 420, width: 100, height: 20, type: "platform"},   // Platform 1: 70px down
        {x: 1850, y: 490, width: 100, height: 20, type: "platform"},   // Platform 2: 70px down
        {x: 2000, y: 560, width: 100, height: 20, type: "platform"},   // Platform 3: 70px down
        {x: 2150, y: 630, width: 100, height: 20, type: "platform"},   // Platform 4: 70px down (below normal screen)
        {x: 2300, y: 700, width: 100, height: 20, type: "platform"},   // Platform 5: 70px down (deep below)
        {x: 2450, y: 770, width: 100, height: 20, type: "platform"},   // Platform 6: 70px down (deeper)
        {x: 2600, y: 840, width: 100, height: 20, type: "platform"},   // Platform 7: 70px down (very deep)
        {x: 2750, y: 910, width: 100, height: 20, type: "platform"},   // Platform 8: 70px down (extremely deep)
        {x: 2900, y: 980, width: 100, height: 20, type: "platform"},   // Platform 9: 70px down (deepest pit)
        {x: 3050, y: 1050, width: 100, height: 20, type: "platform"},  // Platform 10: 70px down (bottom of pit)
        
        // SECTION 6: SPIKE ROLLER CHALLENGE AREA (Immediately after descent)
        {x: 3250, y: 1050, width: 200, height: 30, type: "ground"},    // Entry platform (same level as descent end)
        {x: 3550, y: 1000, width: 150, height: 20, type: "platform"},  // Spike platform 1
        {x: 3800, y: 950, width: 150, height: 20, type: "platform"},   // Spike platform 2
        {x: 4050, y: 900, width: 150, height: 20, type: "platform"},   // Spike platform 3 
        {x: 4300, y: 1000, width: 150, height: 20, type: "platform"},  // Spike platform 4 (down again)
        {x: 4550, y: 1050, width: 200, height: 30, type: "ground"},    // Exit spike area
        
        // SECTION 7: Transition to Boss Arena
        {x: 4850, y: 1050, width: 300, height: 30, type: "ground"},    // Bridge to boss
        
        // SECTION 8: BOSS ARENA (Deep underground level)
        {x: 5250, y: 1050, width: 1200, height: 30, type: "ground"},   // Boss arena floor (deep level)
        
        // SECTION 9: Final stretch to flag (after boss defeat)
        {x: 6550, y: 1050, width: 400, height: 30, type: "ground"}     // Goal area (same deep level)
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
                range: 600
            }
        },
        {
            x: 1100, 
            y: 250, 
            type: "cannoneer", 
            config: {
                direction: -1,    
                fireRate: 2500,
                range: 400        
            }
        },
        {
            x: 1280, 
            y: 170, 
            type: "cannoneer", 
            config: {
                direction: -1,    
                fireRate: 2800,
                range: 350        
            }
        },
        
        // SECTION 5: DEEP PIT DESCENT CANNONEERS (positioned throughout the deep descent)
        {
            x: 1775,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,     
                fireRate: 2000,   
                range: 800,       // Increased range for deep shots
                shootUp: true     
            }
        },
        {
            x: 1925,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer", 
            config: {
                direction: 1,
                fireRate: 2400,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2075,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 1800,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2225,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 2200,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2375,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 1900,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2525,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 2100,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2675,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 1700,   
                range: 800,
                shootUp: true
            }
        },
        {
            x: 2825,
            y: 1100,  // Way below at bottom of pit, shooting UP
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 2300,   
                range: 800,
                shootUp: true
            }
        },
        
        // SECTION 6: SPIKE ROLLER MOBS (Immediately after descent)
        {
            x: 3550,
            y: 970,   // On spike platform 1
            type: "spikeRoller",
            config: {
                platformStart: 3550,
                platformEnd: 3700,
                speed: 3,
                direction: 1
            }
        },
        {
            x: 3800,
            y: 920,   // On spike platform 2
            type: "spikeRoller",
            config: {
                platformStart: 3800,
                platformEnd: 3950,
                speed: 2.5,
                direction: -1
            }
        },
        {
            x: 4050,
            y: 870,   // On spike platform 3
            type: "spikeRoller",
            config: {
                platformStart: 4050,
                platformEnd: 4200,
                speed: 3.5,
                direction: 1
            }
        },
        {
            x: 4300,
            y: 970,   // On spike platform 4
            type: "spikeRoller",
            config: {
                platformStart: 4300,
                platformEnd: 4450,
                speed: 3,
                direction: -1
            }
        },
        
        // SECTION 8: BOSS MOB - Iron Giant (Deep underground boss arena)
        {
            x: 5800,
            y: 1000,  // In the deep boss arena
            type: "ironGiant",
            config: {
                health: 3,           
                patrolDistance: 600, 
                attackRate: 1500,    
                isBoss: true
            }
        }
    ],
    collectibles: [],
    goal: {x: 6900, y: 1020, width: 30, height: 30},  // Goal at deep level after boss
    playerStart: {x: 50, y: 300},
    bossArena: {
        x: 5250,           // Boss arena start (deep underground)
        width: 1200,       // Large width to cover full screen
        respawnX: 5350,    // Respawn inside the deep arena 
        respawnY: 1000,    // Respawn Y position (deep level)
        triggered: false
    },
    background: {
        color1: "#87CEEB", // Sky blue
        color2: "#98FB98"  // Light green
    }
};