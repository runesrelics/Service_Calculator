module.exports = {
    mining: {
        name: "Mining",
        methods: {
            powerMining: {
                name: "Power Mining Iron",
                levelRanges: [
                    { range: [15, 60], price: 50 },
                    { range: [60, 99], price: 45 }
                ]
            },
            motherloadMine: {
                name: "Motherload Mine",
                requirements: "Access to Motherload Mine",
                levelRanges: [
                    { range: [30, 60], price: 45 },
                    { range: [60, 99], price: 40 }
                ]
            },
            volcanic: {
                name: "Volcanic Mine",
                requirements: "Kudos and mining gear",
                levelRanges: [
                    { range: [50, 99], price: 55 }
                ]
            }
        }
    },
    fishing: {
        name: "Fishing",
        methods: {
            barbFishing: {
                name: "Barbarian Fishing",
                requirements: "Barbarian Training",
                levelRanges: [
                    { range: [48, 70], price: 45 },
                    { range: [70, 99], price: 40 }
                ]
            },
            karambwans: {
                name: "Karambwans",
                requirements: "Tai Bwo Wannai Trio quest",
                levelRanges: [
                    { range: [65, 99], price: 50 }
                ]
            }
        }
    },
    woodcutting: {
        name: "Woodcutting",
        methods: {
            teaks: {
                name: "Teaks",
                requirements: "Access to teak trees",
                levelRanges: [
                    { range: [35, 99], price: 45 }
                ]
            },
            sulliusceps: {
                name: "Sulliusceps",
                requirements: "Bone Voyage quest",
                levelRanges: [
                    { range: [65, 99], price: 50 }
                ]
            }
        }
    },
    hunter: {
        name: "Hunter",
        methods: {
            redChins: {
                name: "Red Chinchompas",
                levelRanges: [
                    { range: [63, 80], price: 55 },
                    { range: [80, 99], price: 50 }
                ]
            },
            blackChins: {
                name: "Black Chinchompas",
                requirements: "Access to wilderness",
                levelRanges: [
                    { range: [73, 80], price: 65 },
                    { range: [80, 99], price: 60 }
                ]
            }
        }
    }
};