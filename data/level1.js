// Level 1: The Pound - MASSIVELY EXPANDED with Descending Staircase Section
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
        {x: 1540, y: 350, width: 80, height: 20, type: "platform"},   // Smaller breather platform
        
        // SECTION 5: NEW DESCENDING STAIRCASE SECTION (Mirror of ascending but going down)
        {x: 1700, y: 320, width: 80, height: 20, type: "platform"},   // Start descent
        {x: 1880, y: 280, width: 80, height: 20, type: "platform"},   // Down 1
        {x: 2060, y: 240, width: 80, height: 20, type: "platform"},   // Down 2
        {x: 2240, y: 200, width: 80, height: 20, type: "platform"},   // Down 3
        {x: 2420, y: 160, width: 80, height: 20, type: "platform"},   // Down 4 (lowest)
        
        // SECTION 6: Bridge platform to spike area
        {x: 2580, y: 350, width: 150, height: 20, type: "platform"},
        
        // SECTION 7: Extended running section
        {x: 2800, y: 370, width: 600, height: 30, type: "ground"},
        
        // SECTION 8: SPIKE ROLLER CHALLENGE AREA
        // Multi-level platform section with moving spike rollers
        {x: 3500, y: 370, width: 200, height: 30, type: "ground"},    // Entry platform
        {x: 3800, y: 320, width: 150, height: 20, type: "platform"},  // Lower platform
        {x: 4050, y: 270, width: 150, height: 20, type: "platform"},  // Middle platform  
        {x: 4300, y: 220, width: 150, height: 20, type: "platform"},  // Upper platform
        {x: 4550, y: 320, width: 150, height: 20, type: "platform"},  // Down again
        {x: 4800, y: 370, width: 200, height: 30, type: "ground"},    // Exit platform
        
        // SECTION 9: Another long running section
        {x: 5100, y: 370, width: 1000, height: 30, type: "ground"},
        
        // SECTION 10: Elevated jumping section
        {x: 6200, y: 320, width: 100, height: 20, type: "platform"},
        {x: 6400, y: 280, width: 100, height: 20, type: "platform"},
        {x: 6600, y: 240, width: 100, height: 20, type: "platform"},
        {x: 6800, y: 280, width: 100, height: 20, type: "platform"},
        {x: 7000, y: 320, width: 100, height: 20, type: "platform"},
        {x: 7200, y: 370, width: 300, height: 30, type: "ground"},
        
        // SECTION 11: Final approach to boss (massive running section)
        {x: 7600, y: 370, width: 2000, height: 30, type: "ground"},
        
        // SECTION 12: Boss Arena (moved much further right)
        {x: 9700, y: 370, width: 1200, height: 30, type: "ground"},
        
        // SECTION 13: Final stretch to flag (after boss defeat)
        {x: 11000, y: 370, width: 400, height: 30, type: "ground"}
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
        
        // SECTION 5: NEW DESCENDING STAIRCASE CANNONEERS (shooting UPWARD!)
        {
            x: 1780,
            y: 380,  // Ground level, shooting up at descending player
            type: "cannoneer",
            config: {
                direction: 1,     // Facing right but shooting upward
                fireRate: 2400,
                range: 500,
                shootUp: true     // Special flag for upward shooting
            }
        },
        {
            x: 1960,
            y: 380,  // Ground level, covering middle descent
            type: "cannoneer", 
            config: {
                direction: 1,
                fireRate: 2600,
                range: 450,
                shootUp: true
            }
        },
        {
            x: 2140,
            y: 380,  // Ground level, covering final descent
            type: "cannoneer",
            config: {
                direction: 1,
                fireRate: 2200,   // Fastest firing for final challenge
                range: 400,
                shootUp: true
            }
        },
        
        // SECTION 8: SPIKE ROLLER MOBS - Moving deadly obstacles
        {
            x: 3800,
            y: 290,  // On the lower platform
            type: "spikeRoller",
            config: {
                platformStart: 3800,
                platformEnd: 3950,
                speed: 3,
                direction: 1
            }
        },
        {
            x: 4300,
            y: 190,  // On the upper platform  
            type: "spikeRoller",
            config: {
                platformStart: 4300,
                platformEnd: 4450,
                speed: 2.5,
                direction: -1
            }
        },
        {
            x: 4550,
            y: 290,  // On the exit platform
            type: "spikeRoller", 
            config: {
                platformStart: 4550,
                platformEnd: 4700,
                speed: 3.5,
                direction: 1
            }
        },
        
        // SECTION 10: Additional cannoneer in the elevated section
        {
            x: 6700,
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
            x: 10300,
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
    goal: {x: 11350, y: 340, width: 30, height: 30},  // Much further right after expanded map
    playerStart: {x: 50, y: 300},
    bossArena: {
        x: 9700,           // Arena start (moved much further right)
        width: 1200,       // Large width to cover full screen
        respawnX: 9800,    // Respawn inside the arena 
        respawnY: 300,     // Respawn Y position
        triggered: false
    },
    background: {
        color1: "#87CEEB", // Sky blue
        color2: "#98FB98"  // Light green
    }
};