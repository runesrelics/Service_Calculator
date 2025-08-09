module.exports = {
    construction: {
        name: "Construction",
        methods: {
            mahoganyTables: {
                name: "Mahogany Tables",
                levelRanges: [
                    { range: [1, 33], price: 166.67, description: "Building normal & Oak chairs" },
                    { range: [33, 52], price: 73.33, description: "Building Oak Larders" },
                    { range: [52, 99], price: 26.67, description: "Building Mahogany Tables" }
                ]
            },
            oakDungeonDoors: {
                name: "Oak Dungeon Doors",
                levelRanges: [
                    { range: [1, 33], price: 153.33, description: "Building normal & Oak chairs" },
                    { range: [33, 52], price: 66.67, description: "Building Oak Larders" },
                    { range: [52, 73], price: 26.67, description: "Building Mahogany tables" },
                    { range: [73, 99], price: 36.67, description: "Building Oak Dungeon Doors" }
                ]
            },
            mountedMythicalCape: {
                name: "Mounted Mythical Cape Rack (Requires DS2)",
                levelRanges: [
                    { range: [1, 33], price: 150, description: "Building normal & Oak chairs" },
                    { range: [33, 50], price: 65, description: "Building Oak Larders" },
                    { range: [50, 99], price: 30, description: "Building Mounted Mythical Cape Racks" }
                ]
            },
            teakBenches: {
                name: "Teak Benches",
                levelRanges: [
                    { range: [1, 33], price: 150, description: "Building normal & Oak chairs" },
                    { range: [33, 52], price: 66.67, description: "Building Oak Larders" },
                    { range: [52, 66], price: 25, description: "Building Mahogany tables" },
                    { range: [66, 99], price: 30, description: "Building Teak Benches" }
                ]
            },
            mahoganyHomes: {
                name: "Mahogany Homes",
                levelRanges: [
                    { range: [1, 20], price: 427, requirements: "Requires: Normal Planks, Steel bars, Law runes & Xeric Amulet with charges banked" },
                    { range: [20, 50], price: 196.67, requirements: "Requires: Oak Planks, Steel bars, Law runes & Xeric Amulet with charges banked" },
                    { range: [50, 99], price: 116.67, requirements: "Requires: Teak Planks, Steel bars, Law runes & Xeric Amulet with charges banked" }
                ]
            }
        }
    },
    smithing: {
        name: "Smithing",
        methods: {
            blastFurnaceGold: {
                name: "Blast Furnace - Gold bars",
                levelRanges: [
                    { range: [1, 40], price: 126.67, description: "Smithing varies items" },
                    { range: [40, 99], price: 46.67, requirements: "Requires Gold Gauntlets & Ice gloves" }
                ]
            },
            platebodySmithing: {
                name: "Platebody smithing",
                levelRanges: [
                    { range: [1, 48], price: 126.67, description: "Smithing varies items" },
                    { range: [48, 99], price: 61.67, description: "Smithing the best platebodies you can" }
                ]
            },
            dartTipsKnives: {
                name: "Dart tips / Knifes",
                levelRanges: [
                    { range: [1, 40], price: 126.67, description: "Smithing varies items" },
                    { range: [40, 99], price: 73.33, description: "Smithing Dart tips / Knifes" }
                ]
            },
            blastFurnaceBarMaking: {
                name: "Blast furnace - Bar making",
                levelRanges: [
                    { range: [1, 15], price: 126.67, description: "Smithing varies items" },
                    { range: [15, 30], price: 200, requirements: "Requires Coal bag, Ice gloves and Stamina potions. +20% for no Stamina potions" },
                    { range: [30, 50], price: 166.67, requirements: "Requires Coal bag, Ice gloves and Stamina potions. +20% for no Stamina potions" },
                    { range: [50, 70], price: 133.33, requirements: "Requires Coal bag, Ice gloves and Stamina potions. +20% for no Stamina potions" },
                    { range: [70, 85], price: 133.33, requirements: "Requires Coal bag, Ice gloves and Stamina potions. +20% for no Stamina potions" },
                    { range: [85, 99], price: 133.33, requirements: "Requires Coal bag, Ice gloves and Stamina potions. +20% for no Stamina potions" }
                ]
            }
        }
    }
};