const workController = require('../BL/controllers/work.controller')
const teamController = require('../BL/controllers/team.controller')


async function createNewWork(data) {

    const work = {

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
    }

    const newWork = await workController.create(work);
    try {

        const updateTeam = await teamController.addnewwork(data.teamId, newWork._id);
    }
    catch (error) {
        console.log(error)
    }


    return newWork

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
    const previousWork = await workController.readOne({ _id: id });
    try {
        // נסיר את העבודה מרשימת העבודות של הצוות הקודם
        await teamController.removework(previousWork.teamId, id);

        // נוסיף את העבודה לרשימת העבודות של הצוות החדש
        await teamController.addnewwork(data.teamId, id);

        // עדכון העבודה במקובל
        return await workController.update(id, data);
    } catch (error) {
        console.error('Error in updateWork:', error);
        throw error; // החזרת השגיאה למי שקרא לפונקציה
    }

}

async function deleteWork(id) {
    try {
        const work = await workController.readOne({ _id: id })
        const removeTeam = await teamController.removework(work.teamId, id);
    }
    catch (error) {
        console.log(error)
    }
    return updateWork(id, { isActive: false })
}

module.exports = { createNewWork, readOneWork, readAllWork, updateWork, deleteWork }