const mongoose = require('mongoose')



const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamUsers:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "employee",
        required: true
    }],
    color:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
const teamModel = mongoose.model('team', teamSchema)
module.exports = teamModel