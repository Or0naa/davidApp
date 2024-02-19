const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    work:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "work",
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel