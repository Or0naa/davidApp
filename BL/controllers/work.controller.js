const workModel = require('../models/work.model')

async function create(data) {
    return await workModel.create(data)
}

async function readOne(filter) {
    return await workModel.findOne(filter)
}

async function readAll() {
    return await workModel.find( { isActive: true })
}

async function update(id, data) {
    return await workModel.updateOne({ _id: id }, data)
}

async function addTaskToWork(id, data) {
    const workToUpdate = await workModel.findById(id);
    
    if (!workToUpdate) {
        throw new Error("Work not found");
    }

    workToUpdate.tasks.push(data);
    await workToUpdate.save()
    
    return workToUpdate;
}


async function deletework(id) {
    return await workModel.findByIdAndUpdate(id, { isActive: false })
}

exports = module.exports = {addTaskToWork, create, readOne, readAll, update, deletework }