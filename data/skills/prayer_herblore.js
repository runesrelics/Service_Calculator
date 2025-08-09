module.exports = {
    prayer: {
        name: "Prayer",
        methods: {
            gildedAltar: {
                name: "Gilded altar - Dragon Bones",
                levelRanges: [
                    { range: [1, 99], price: 40, description: "Dragon bones 1-99" }
                ]
            },
            gildedAlterSuperior: {
                name: "Gilded Alter - Superior Dragon Bones",
                levelRanges: [
                    { range: [1, 70], price: 40, description: "Dragon bones 1-70" },
                    { range: [70, 99], price: 33.33, description: "Superior Dragon Bones 70-99" }
                ]
            },
            wildernessChaos: {
                name: "Wilderness Chaos Alter - Dangerous!",
                levelRanges: [
                    { range: [1, 99], price: 33.33, description: "Dragon bones 1-99" }
                ]
            },
            wildernessChaosSuper: {
                name: "Wilderness Chaos Alter - Dangerous!",
                levelRanges: [
                    { range: [1, 70], price: 33.33, description: "Dragon Bones 1-70" },
                    { range: [70, 99], price: 26.67, description: "Superior Dragon Bones 70-99" }
                ]
            }
        }
    },
    herblore: {
        name: "Herblore",
        methods: {
            potionMaking: {
                name: "Potion Making - Requires Druidic Ritual",
                levelRanges: [
                    { range: [1, 26], price: 200, description: "Making Attack potions" },
                    { range: [26, 38], price: 66.67, description: "Making Energy potions" },
                    { range: [38, 52], price: 40, description: "Making Prayer potions" },
                    { range: [52, 81], price: 33.33, description: "Making Super Energy potions" },
                    { range: [81, 99], price: 26.67, description: "Making Saradomin Brews" }
                ]
            }
        }
    }
};