// Level 1: The Pound - Deep Pit Descent Below Screen Level
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
        
        // SECTION 5: DEEP PIT DESCENT (Going WAY below screen level with DOUBLED platforms)
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
        
        // SECTION 6: Bridge platform back up to normal level (BIG jump back up)
        {x: 3300, y: 350, width: 200, height: 20, type: "platform"},
        
        // SECTION 7: Extended running section
        {x: 3600, y: 370, width: 600, height: 30, type: "ground"},
        
        // SECTION 8: SPIKE ROLLER CHALLENGE AREA
        // Multi-level platform section with moving spike rollers
        {x: 4300, y: 370, width: 200, height: 30, type: "ground"},    // Entry platform
        {x: 4600, y: 320, width: 150, height: 20, type: "platform"},  // Lower platform
        {x: 4850, y: 270, width: 150, height: 20, type: "platform"},  // Middle platform  
        {x: 5100, y: 220, width: 150, height: 20, type: "platform"},  // Upper platform
        {x: 5350, y: 320, width: 150, height: 20, type: "platform"},  // Down again
        {x: 5600, y: 370, width: 200, height: 30, type: "ground"},    // Exit platform
        
        // SECTION 9: Another long running section
        {x: 5900, y: 370, width: 1000, height: 30, type: "ground"},
        
        // SECTION 10: Elevated jumping section
        {x: 7000, y: 320, width: 100, height: 20, type: "platform"},
        {x: 7200, y: 280, width: 100, height: 20, type: "platform"},
        {x: 7400, y: 240, width: 100, height: 20, type: "platform"},
        {x: 7600, y: 280, width: 100, height: 20, type: "platform"},
        {x: 7800, y: 320, width: 100, height: 20, type: "platform"},
        {x: 8000, y: 370, width: 300, height: 30, type: "ground"},
        
        // SECTION 11: Final approach to boss (massive running section)
        {x: 8400, y: 370, width: 2000, height: 30, type: "ground"},
        
        // SECTION 12: Boss Arena (moved much further right)
        {x: 10500, y: 370, width: 1200, height: 30, type: "ground"},
        
        // SECTION 13: Final stretch to flag (after boss defeat)
        {x: 11800, y: 370, width: 400, height: 30, type: "ground"}
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
        
        // SECTION 8: SPIKE ROLLER MOBS - Moving deadly obstacles
        {
            x: 4600,
            y: 290,  // On the lower platform
            type: "spikeRoller",
            config: {
                platformStart: 4600,
                platformEnd: 4750,
                speed: 3,
                direction: 1
            }
        },
        {
            x: 5100,
            y: 190,  // On the upper platform  
            type: "spikeRoller",
            config: {
                platformStart: 5100,
                platformEnd: 5250,
                speed: 2.5,
                direction: -1
            }
        },
        {
            x: 5350,
            y: 290,  // On the exit platform
            type: "spikeRoller", 
            config: {
                platformStart: 5350,
                platformEnd: 5500,
                speed: 3.5,
                direction: 1
            }
        },
        
        // SECTION 10: Additional cannoneer in the elevated section
        {
            x: 7500,
            y: 210,
            type: "cannoneer",
            config: {
                direction: -1,
                fireRate: 2200,
                range: 500
            }
        },
        
        // SECTION 12: BOSS MOB - Iron Giant (moved much further right)
        {
            x: 11100,
            y: 320,
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
    goal: {x: 12150, y: 340, width: 30, height: 30},  // Much further right after expanded map
    playerStart: {x: 50, y: 300},
    bossArena: {
        x: 10500,          // Arena start (moved much further right)
        width: 1200,       // Large width to cover full screen
        respawnX: 10600,   // Respawn inside the arena 
        respawnY: 300,     // Respawn Y position
        triggered: false
    },
    background: {
        color1: "#87CEEB", // Sky blue
        color2: "#98FB98"  // Light green
    }
};