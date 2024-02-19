const taskController = require('../BL/controllers/task.controller')
const workController = require('../BL/controllers/work.controller')

async function createNewTask(data) {
    const task = {
        work: data.workId, // נניח שאתה יוצר תיק עם השדה workId
        taskName: data.taskName,
        isDone: data.isDone,
        isActive: data.isActive
    }
    const newtask = await taskController.create(task);
    const work = await workController.readOne({_id: newtask.work});  
    work.tasks.push( newtask._id);
    await work.save();
    }

// createNewTask({
//     workId: "65cdccb17d3cd96d4ec5686c",
//     taskName: "וגם לכמות",
// });



async function readAlltask(filter) {
    const tasksInWork = await taskController.readAll();
    
    const filteredTasks = tasksInWork.filter(t => t.work.toString() === filter);

    // console.log(filteredTasks);
    return filteredTasks;
}

// readAlltask("65cdccb17d3cd96d4ec5686c");

    
async function readOneTask(id){
    return await taskController.readOne({_id : id})
}

async function updatetask(id, data) {
    // console.log("in service: ",id, data)
    return await taskController.update(id, data)
}

async function deletetask(id) {
    return await taskController.delete(id)
}

module.exports = { createNewTask, readAlltask, updatetask, deletetask, readOneTask }