module.exports = {
    prayer: {
        name: "Prayer",
        methods: {
            chaos: {
                name: "Chaos Altar",
                requirements: "Access to Wilderness",
                levelRanges: [
                    { range: [1, 99], price: 133.33 }
                ]
            },
            gilded: {
                name: "Gilded Altar",
                requirements: "Access to player-owned house with gilded altar",
                levelRanges: [
                    { range: [1, 99], price: 150 }
                ]
            }
        }
    },
    construction: {
        name: "Construction",
        methods: {
            oakLarders: {
                name: "Oak Larders",
                levelRanges: [
                    { range: [33, 74], price: 116.67 }
                ]
            },
            oakDungeonDoors: {
                name: "Oak Dungeon Doors",
                levelRanges: [
                    { range: [74, 99], price: 100 }
                ]
            }
        }
    },
    herblore: {
        name: "Herblore",
        methods: {
            superCombats: {
                name: "Super Combat Potions",
                levelRanges: [
                    { range: [90, 99], price: 133.33 }
                ]
            },
            superRestores: {
                name: "Super Restore Potions",
                levelRanges: [
                    { range: [63, 99], price: 116.67 }
                ]
            }
        }
    },
    runecrafting: {
        name: "Runecrafting",
        methods: {
            lavas: {
                name: "Lava Runes",
                requirements: "Magic Imbue spell recommended",
                levelRanges: [
                    { range: [23, 99], price: 133.33 }
                ]
            },
            astrals: {
                name: "Astral Runes",
                requirements: "Lunar Diplomacy quest",
                levelRanges: [
                    { range: [82, 99], price: 116.67 }
                ]
            }
        }
    },
    farming: {
        name: "Farming",
        methods: {
            treesAndFruit: {
                name: "Trees & Fruit Trees",
                levelRanges: [
                    { range: [1, 99], price: 166.67 }
                ]
            },
            titheFarm: {
                name: "Tithe Farm",
                requirements: "Access to Hosidius House",
                levelRanges: [
                    { range: [34, 99], price: 150 }
                ]
            }
        }
    }
};