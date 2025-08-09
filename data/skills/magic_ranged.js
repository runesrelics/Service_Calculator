module.exports = {
    magic: {
        name: "Magic",
        methods: {
            splashing: {
                name: "Splashing",
                levelRanges: [
                    { range: [1, 99], price: 120, description: "Splashing using best spells per level" }
                ]
            },
            burstingMM1: {
                name: "Bursting/Barraging - MM1 tunnels",
                levelRanges: [
                    { range: [1, 55], price: 73.33, description: "Splashing & teleporting (1-55)" },
                    { range: [55, 70], price: 53.33, description: "High Alching items (55-70)" },
                    { range: [70, 99], price: 33.33, description: "Monkey Madness 1 completed or progressed until tunnel access" }
                ]
            },
            burstingMM2: {
                name: "Bursting/Barraging - MM2 tunnels",
                levelRanges: [
                    { range: [1, 55], price: 73.33, description: "Splashing & teleporting (1-55)" },
                    { range: [55, 70], price: 53.33, description: "High Alching items (55-70)" },
                    { range: [70, 99], price: 20, description: "Monkey Madness 2 completed or progressed until tunnel access" }
                ]
            },
            arceusLibrary: {
                name: "Arceuus Library",
                levelRanges: [
                    { range: [1, 99], price: 86.67, requirements: "Full Graceful outfit required" }
                ]
            }
        }
    },
    ranged: {
        name: "Ranged",
        methods: {
            sandCrabs: {
                name: "Sand Crabs",
                levelRanges: [
                    { range: [1, 99], price: 33.33 }
                ]
            },
            dwarfCannon: {
                name: "Dwarf Cannon",
                levelRanges: [
                    { range: [1, 99], price: 33.33, requirements: "Requires Dwarf Cannon" }
                ]
            },
            chinningMM1: {
                name: "Chinning - MM1 Tunnels",
                levelRanges: [
                    { range: [1, 55], price: 26.67, description: "Sand Crabs" },
                    { range: [55, 99], price: 33.33, requirements: "Monkey Madness 1 completed or progressed until tunnel access" }
                ]
            },
            chinningMM2: {
                name: "Chinning - MM2 Tunnels",
                levelRanges: [
                    { range: [1, 55], price: 26.67, description: "Sand Crabs" },
                    { range: [55, 99], price: 20, requirements: "Monkey Madness 2 completed or progressed until tunnel access" }
                ]
            },
            nightmareZonePrayer: {
                name: "Nightmare Zone - Prayer",
                levelRanges: [
                    { range: [1, 75], price: 40, description: "Nightmare Zone training" },
                    { range: [75, 99], price: 30, requirements: "Requires Toxic blowpipe" }
                ]
            },
            nightmareZoneAbsorption: {
                name: "Nightmare Zone - Absorption potion",
                levelRanges: [
                    { range: [1, 75], price: 35, description: "Nightmare Zone training" },
                    { range: [75, 99], price: 21.67, requirements: "Requires Toxic blowpipe" }
                ]
            }
        }
    }
};