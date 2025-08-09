module.exports = {
    crafting: {
        name: "Crafting",
        methods: {
            leathercraft: {
                name: "Dragon Hide Bodies",
                levelRanges: [
                    { range: [63, 99], price: 66.67 }
                ]
            },
            glassblowing: {
                name: "Light Orbs",
                levelRanges: [
                    { range: [87, 99], price: 60 }
                ]
            }
        }
    },
    fletching: {
        name: "Fletching",
        methods: {
            darts: {
                name: "Dragon Darts",
                levelRanges: [
                    { range: [81, 99], price: 55 }
                ]
            },
            bows: {
                name: "Magic Longbows",
                levelRanges: [
                    { range: [85, 99], price: 50 }
                ]
            }
        }
    },
    smithing: {
        name: "Smithing",
        methods: {
            goldBars: {
                name: "Gold Bars at Blast Furnace",
                requirements: "Access to Blast Furnace",
                levelRanges: [
                    { range: [40, 99], price: 83.33 }
                ]
            },
            runeBars: {
                name: "Rune Bars at Blast Furnace",
                requirements: "Access to Blast Furnace",
                levelRanges: [
                    { range: [85, 99], price: 75 }
                ]
            }
        }
    },
    cooking: {
        name: "Cooking",
        methods: {
            wines: {
                name: "Wines",
                levelRanges: [
                    { range: [35, 99], price: 40 }
                ]
            },
            sharks: {
                name: "Sharks",
                levelRanges: [
                    { range: [80, 99], price: 35 }
                ]
            }
        }
    }
};