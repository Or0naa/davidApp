const workModel = require('../models/work.model')
const teamModel = require('../models/team.model')
const userModel = require('../models/employee.model')

async function create(data) {
    console.log("controller create", data)
    try {
        return await workModel.create(data)
    } catch (error) {
        console.log(error)
    }
}

// create({
//     beggingTime: '2024-02-21T:12:05:00.000Z',
//     endingTime: '2024-02-21T:16:40:00.000Z',
//     teamId: '65cdc0006385668e3da955b2',
//     tasks: undefined,
//     price: '600',
//     invoice: undefined,
//     address: 'מגדלים',
//     phoneClient: '0532853741',
//     clientName: 'דוד',
//     img: undefined,
//     description: 'לשתות קפה'
  
// })

async function readOne(filter) {
    return await workModel.findOne(filter)
        .populate("teamId")
        .populate({ path: 'teamId.teamUsers', model: 'User' })
        
}

// readOne({_id: "65d646a3c215da3525025d82"})

async function readAll() {
    return await workModel.find( { isActive: true })
}

async function update(id, data) {
    return await workModel.findByIdAndUpdate({ _id: id }, data)
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