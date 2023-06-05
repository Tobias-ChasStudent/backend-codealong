import mongoose from "mongoose"

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
})