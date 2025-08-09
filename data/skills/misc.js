module.exports = {
    thieving: {
        name: "Thieving",
        methods: {
            blackjacking: {
                name: "Blackjacking",
                requirements: "The Feud quest",
                levelRanges: [
                    { range: [45, 91], price: 50 },
                    { range: [91, 99], price: 45 }
                ]
            },
            artefacts: {
                name: "Stealing Artefacts",
                requirements: "Access to Piscarilius House",
                levelRanges: [
                    { range: [49, 99], price: 55 }
                ]
            }
        }
    },
    slayer: {
        name: "Slayer",
        methods: {
            standardTasks: {
                name: "Standard Tasks",
                requirements: "Combat stats for assigned monsters",
                levelRanges: [
                    { range: [1, 99], price: 166.67 }
                ]
            },
            bossSlayer: {
                name: "Boss Tasks",
                requirements: "High combat stats and gear",
                levelRanges: [
                    { range: [1, 99], price: 200 }
                ]
            }
        }
    },
    firemaking: {
        name: "Firemaking",
        methods: {
            logs: {
                name: "Regular Logs",
                levelRanges: [
                    { range: [1, 50], price: 40 }
                ]
            },
            wintertodt: {
                name: "Wintertodt",
                requirements: "Warm clothing",
                levelRanges: [
                    { range: [50, 99], price: 35 }
                ]
            }
        }
    }
};