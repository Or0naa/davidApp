const mongoose = require('mongoose')
require('./work.model')
const employeeSchema = new mongoose.Schema({
    eName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    permission: {
        type: String,
        enum: ["employee", "admin"],
        default: "employee",
    },
    work: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "work",
    }],
    phon: {
        type: String
    }
})
const employeeModel = mongoose.model('employee', employeeSchema)

module.exports = employeeModel;
