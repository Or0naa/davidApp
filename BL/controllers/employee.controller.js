const employeeModel = require('../models/employee.model')

async function create(data) {
    return await employeeModel.create(data)
}

async function readOne(filter) {
    return await employeeModel.findOne(filter).populate("eName")
}

async function readAll(filter) {
    return await employeeModel.find(filter)
}

async function update(id, data) {
    return await employeeModel.updateOne({ _id: id }, data)
}

async function deleteEmployee(id) {
    return await employeeModel.findByIdAndUpdate(id, { isActive: false })
}

exports = module.exports = { create, readOne, readAll, update, deleteEmployee }