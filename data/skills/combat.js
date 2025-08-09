module.exports = {
    attack: {
        name: "Attack",
        methods: {
            sandCrabs: {
                name: "Sand crabs",
                levelRanges: [
                    { range: [1, 40], price: 46.67 },
                    { range: [40, 60], price: 33.33 },
                    { range: [60, 99], price: 33.33 }
                ]
            },
            ammoniteCrabs: {
                name: "Ammonite Crabs",
                requirements: "Bone Voyage Quest",
                levelRanges: [
                    { range: [1, 40], price: 43.33 },
                    { range: [40, 60], price: 20 },
                    { range: [60, 99], price: 28.33 }
                ]
            },
            nightmareZonePrayer: {
                name: "Nightmare Zone - Prayer Potions",
                requirements: "Quests to unlock Nightmare Zone & prayer potions",
                levelRanges: [
                    { range: [1, 70], price: 40 },
                    { range: [70, 99], price: 33.33 }
                ]
            },
            nightmareZoneAbsorption: {
                name: "Nightmare Zone - Absorption potions",
                requirements: "Quests to unlock Nightmare Zone training",
                levelRanges: [
                    { range: [1, 70], price: 33.33 },
                    { range: [70, 99], price: 21.67 }
                ]
            }
        }
    },
    strength: {
        name: "Strength",
        methods: {
            sandCrabs: {
                name: "Sand crabs",
                levelRanges: [
                    { range: [1, 40], price: 46.67 },
                    { range: [40, 60], price: 33.33 },
                    { range: [60, 99], price: 33.33 }
                ]
            },
            ammoniteCrabs: {
                name: "Ammonite Crabs",
                requirements: "Bone Voyage Quest",
                levelRanges: [
                    { range: [1, 40], price: 43.33 },
                    { range: [40, 60], price: 20 },
                    { range: [60, 99], price: 28.33 }
                ]
            },
            nightmareZonePrayer: {
                name: "Nightmare Zone - Prayer Potions",
                requirements: "Quests to unlock Nightmare Zone & prayer potions",
                levelRanges: [
                    { range: [1, 70], price: 40 },
                    { range: [70, 99], price: 33.33 }
                ]
            },
            nightmareZoneAbsorption: {
                name: "Nightmare Zone - Absorption potions",
                requirements: "Quests to unlock Nightmare Zone training",
                levelRanges: [
                    { range: [1, 70], price: 33.33 },
                    { range: [70, 99], price: 21.67 }
                ]
            }
        }
    },
    defence: {
        name: "Defence",
        methods: {
            sandCrabs: {
                name: "Sand crabs",
                levelRanges: [
                    { range: [1, 40], price: 46.67 },
                    { range: [40, 60], price: 33.33 },
                    { range: [60, 99], price: 33.33 }
                ]
            },
            ammoniteCrabs: {
                name: "Ammonite Crabs",
                requirements: "Bone Voyage Quest",
                levelRanges: [
                    { range: [1, 40], price: 43.33 },
                    { range: [40, 60], price: 20 },
                    { range: [60, 99], price: 28.33 }
                ]
            },
            nightmareZonePrayer: {
                name: "Nightmare Zone - Prayer Potions",
                requirements: "Quests to unlock Nightmare Zone & prayer potions",
                levelRanges: [
                    { range: [1, 70], price: 40 },
                    { range: [70, 99], price: 33.33 }
                ]
            },
            nightmareZoneAbsorption: {
                name: "Nightmare Zone - Absorption potions",
                requirements: "Quests to unlock Nightmare Zone training",
                levelRanges: [
                    { range: [1, 70], price: 33.33 },
                    { range: [70, 99], price: 21.67 }
                ]
            }
        }
    },
    ranged: {
        name: "Ranged",
        methods: {
            chinning: {
                name: "Red Chinchompas",
                requirements: "Monkey Madness I quest",
                levelRanges: [
                    { range: [60, 70], price: 116.67 },
                    { range: [70, 80], price: 100 },
                    { range: [80, 99], price: 83.33 }
                ]
            },
            blackChinning: {
                name: "Black Chinchompas",
                requirements: "Monkey Madness I quest",
                levelRanges: [
                    { range: [60, 70], price: 133.33 },
                    { range: [70, 80], price: 116.67 },
                    { range: [80, 99], price: 100 }
                ]
            }
        }
    },
    magic: {
        name: "Magic",
        methods: {
            burstingDust: {
                name: "Bursting Dust Devils",
                requirements: "Desert Treasure quest, 65 Slayer",
                levelRanges: [
                    { range: [70, 80], price: 116.67 },
                    { range: [80, 90], price: 100 },
                    { range: [90, 99], price: 83.33 }
                ]
            },
            burstingManiacal: {
                name: "Bursting Maniacal Monkeys",
                requirements: "MM2 quest",
                levelRanges: [
                    { range: [70, 80], price: 133.33 },
                    { range: [80, 90], price: 116.67 },
                    { range: [90, 99], price: 100 }
                ]
            }
        }
    }
};