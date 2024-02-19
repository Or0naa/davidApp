const taskModel = require('../models/task.model')

async function create(data) {
    return await taskModel.create(data)
}

async function readOne(filter) {
    return await taskModel.findOne(filter)
}

async function readAll(filter) {
    return await taskModel.find(filter).populate("taskName isDone");
}


async function update(id, data) {
    // console.log("in controller: ",id, data)

    return await taskModel.findByIdAndUpdate({ _id: id }, data)
}

async function deletetask(id) {
    return await taskModel.findByIdAndUpdate(id, { isActive: false })
}

exports = module.exports = { create, readOne, readAll, update, deletetask }