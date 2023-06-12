const mongoose = require('mongoose')

const learningPathSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    estimatedHours: {
        type: Number,
        required: true
    },
    steps: [{
        title: String,
        done: Boolean,
        desc: String,
        link: String
    }]
})

module.exports = mongoose.model('LearningPath', learningPathSchema)