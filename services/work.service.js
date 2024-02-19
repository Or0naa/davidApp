const workController = require('../BL/controllers/work.controller')


async function createNewWork(data) {


    const work = {
        
        workDate: data.workDate,
        beggingTime: data.beggingTime,
        endingTime: data.endingTime,
        teamId: data.teamId,
        tasks: data.tasks,
        price: data.price,
        invoice: data.invoice,
        address: data.address,
        phoneClient: data.phoneClient,
        clientName: data.clientName,
        img: data.img,
        description: data.description,
        chat: data.chat,
        isActive: data.isActive,
    }

    return await workController.create(work)
}

// createNewWork({
//     workDate: "2024-03-04",
//     beggingTime: "11:00",
//     endingTime: "12:15",
//     teamId: "65cdc0462ed27ccad7a3ca7d",
//     price: 7000,
//     address: "שילה",
//     phoneClient: "0500000000",
//     clientName: "דנה",
//     description: "למלא גז",
// })

async function readOneWork(filter) {
    return await workController.readOne(filter)
}

async function readAllWork(filter) {
    return await workController.readAll(filter)
}

async function updateWork(id, data) {
 
    return await workController.update(id, data)
}

async function deleteWork(id) {
    return updateWork(id, { isActive: false })
}

module.exports = { createNewWork, readOneWork, readAllWork, updateWork, deleteWork }