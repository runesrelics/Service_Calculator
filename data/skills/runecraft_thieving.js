module.exports = {
    runecrafting: {
        name: "Runecrafting",
        methods: {
            lavaRunes: {
                name: "Lava Rune Runecrafting",
                levelRanges: [
                    { range: [1, 23], price: 253.33, description: "Crafting Mind Runes" },
                    { range: [23, 50], price: 206.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" },
                    { range: [50, 75], price: 166.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" },
                    { range: [75, 99], price: 126.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" }
                ]
            },
            bloodSoulRunes: {
                name: "Blood / Soul Rune Runecrafting",
                levelRanges: [
                    { range: [1, 23], price: 253.33, description: "Crafting Mind Runes" },
                    { range: [23, 50], price: 206.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" },
                    { range: [50, 75], price: 166.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" },
                    { range: [75, 77], price: 126.67, requirements: "Requires 82 magic & Lunar diplomacy for best result" },
                    { range: [77, 99], price: 106.67, requirements: "Crafting blood or Soul Runes (90 RC required first)" }
                ]
            },
            ironmanRunecrafting: {
                name: "Ironman Runecrafting",
                levelRanges: [
                    { range: [1, 77], price: 333.33, description: "Arceuus Library training method" },
                    { range: [77, 99], price: 106.67, requirements: "Crafting blood or Soul Runes (90 RC required first)" }
                ]
            }
        }
    },
    thieving: {
        name: "Thieving",
        methods: {
            knightsOfArdougne: {
                name: "Knights of Ardougne",
                levelRanges: [
                    { range: [1, 55], price: 266.67, description: "Pickpocketing & thieving Stalls" },
                    { range: [55, 70], price: 166.67, description: "Thieving Ardougne Knights" },
                    { range: [70, 80], price: 100, description: "Thieving Ardougne Knights" },
                    { range: [80, 90], price: 66.67, description: "Thieving Ardougne Knights" },
                    { range: [90, 95], price: 53.33, description: "Thieving Ardougne Knights" },
                    { range: [95, 99], price: 53.33, description: "Thieving Ardougne Knights" }
                ]
            },
            masterFarmers: {
                name: "Thieving Master Farmers",
                levelRanges: [
                    { range: [1, 38], price: 333.33, description: "Pickpocketing & thieving Stalls" },
                    { range: [38, 50], price: 253.33, requirements: "71+ farming provides better seeds" },
                    { range: [50, 60], price: 200, requirements: "71+ farming provides better seeds" },
                    { range: [60, 70], price: 166.67, requirements: "71+ farming provides better seeds" },
                    { range: [70, 80], price: 120, requirements: "71+ farming provides better seeds" },
                    { range: [80, 90], price: 91.67, requirements: "71+ farming provides better seeds" },
                    { range: [90, 94], price: 73.33, requirements: "71+ farming provides better seeds" },
                    { range: [94, 99], price: 66.67, requirements: "71+ farming provides better seeds" }
                ]
            }
        }
    }
};