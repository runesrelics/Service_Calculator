module.exports = {
    agility: {
        name: "Agility",
        methods: {
            rooftops: {
                name: "Rooftop Courses",
                requirements: "Access to various rooftop agility courses",
                levelRanges: [
                    { range: [1, 10], price: 50 },
                    { range: [10, 20], price: 50 },
                    { range: [20, 30], price: 50 },
                    { range: [30, 40], price: 50 },
                    { range: [40, 50], price: 50 },
                    { range: [50, 60], price: 50 },
                    { range: [60, 70], price: 50 },
                    { range: [70, 80], price: 50 },
                    { range: [80, 90], price: 50 },
                    { range: [90, 99], price: 50 }
                ]
            },
            sepulchre: {
                name: "Hallowed Sepulchre",
                requirements: "Sins of the Father quest",
                levelRanges: [
                    { range: [52, 60], price: 60 },
                    { range: [60, 70], price: 60 },
                    { range: [70, 80], price: 60 },
                    { range: [80, 92], price: 60 },
                    { range: [92, 99], price: 60 }
                ]
            }
        }
    }
};