module.exports = {
    farming: {
        name: "Farming",
        methods: {
            titheFarming: {
                name: "Tithe farming",
                levelRanges: [
                    { range: [1, 34], price: 153.33, description: "Tree's & Allotments" },
                    { range: [34, 54], price: 286.67 },
                    { range: [54, 74], price: 133.33 },
                    { range: [74, 99], price: 86.67 }
                ]
            }
        }
    },
    slayer: {
        name: "Slayer",
        methods: {
            cannonBursting: {
                name: "Cannon & Bursting",
                levelRanges: [
                    { range: [1, 50], price: 400, requirements: "Dwarf Cannon & Desert treasure unlocked & required" },
                    { range: [50, 99], price: 166.67, requirements: "Dwarf Cannon & Desert treasure unlocked & required" }
                ]
            },
            noCannonBursting: {
                name: "No Cannon or Bursting",
                levelRanges: [
                    { range: [1, 50], price: 466.67 },
                    { range: [50, 99], price: 233.33 }
                ]
            },
            ironmanCannon: {
                name: "Ironman - Cannon & Bursting",
                levelRanges: [
                    { range: [1, 99], price: 500, requirements: "Please open a ticket to discuss a reduced price. This is based on gear and stats for ironman accounts" }
                ]
            },
            ironmanNoCannon: {
                name: "Ironman - No Cannon or Bursting",
                levelRanges: [
                    { range: [1, 99], price: 700, requirements: "Please open a ticket to discuss a reduced price. This is based on gear and stats for ironman accounts" }
                ]
            }
        }
    }
};