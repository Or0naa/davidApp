const mongoose = require('mongoose')
// require('./task.model')
// require('./team.model')

const workSchema = new mongoose.Schema({
    // workDate: {
    //     type: Date,
    //     default: Date.now
    // },
    beggingTime: {
        type: Date,
        required: true
    },
    endingTime: {
        type: Date,
        required: true
    },
    teamId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "team",
        required: true
    },
    tasks: [
        {
            taskId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "task",
                
            },
            isActive: {
                type: Boolean,
                default: true
            }
        }
    ],
    price: {
        type: Number,
    },
    invoice:{
        type: Boolean
    },
    address:{
        type: String
    },
    phoneClient: {
        type: String
    },
    clientName: {
        type: String
    },
    img: {
        type: String
    },
    description:{
        type: String
    },
    chat: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDone:{
        type: Boolean,
        default: false
    }
})

const workModel = mongoose.model('work', workSchema)
module.exports = workModel