const teamModel = require('../models/team.model')

async function create(data) {
    return await teamModel.create(data)
}

async function readOne(filter) {
    return await teamModel.findOne(filter).populate("teamUsers teamName color");
}

async function readAll(){
    return await teamModel.find( { isActive: true }).populate("teamUsers teamName color");
}

async function readMany(filter) {
    const result = await teamModel.find();
    
    for (let i = 0; i < result.length; i++) {
        if (result[i].teamUsers.find(user => user._id.toString() === filter.id)) {
            result[i].isMember = true;
        }
    }

    return result;
}

// const res = async () => {
//     return await readMany({ id: "65cdbdb7614c43b612e0dc7c" }).then(res => {
//         console.log(res);
//     });
// }

// res();


async function addnewwork(id, data) {
    // console.log("addnewwork", data);
    const team = await teamModel.findById(id).populate("teamUsers");
    
    team.teamUsers.forEach(async (user) => {
        if (user.work.find(workId => workId.toString() === data.toString())) {
            console.log("already in work");
            return;
        }
        user.work.push(data);
        await user.save();  // אם אתה משתמש ב-async/await, וודא שגם פה אתה ממתין לסיום ה-save
    });
    
    // return team;
}

async function removework(id, data) {
    // console.log("removework", data);
    const team = await teamModel.findById(id).populate("teamUsers");
    // console.log(team.teamUsers);

    team.teamUsers.forEach(async (user) => {
        user.work = user.work.filter(workId => workId.toString() !== data.toString());
        await user.save();  
        // console.log(user.work);
    });

    // return team;
}



async function update(id, data) {
    const team = {
        teamName: data.teamName,
        teamUsers: data.teamUsers,
        isActive: data.isActive,
        color: data.color ? data.color : "#626262",
    }
    return await teamModel.updateOne({ _id: id }, data)
}

async function addnewuser(id, data) {
    const team = await teamModel.findById(id)
    team.teamUsers.push(data)
    return await teamModel.updateOne({ _id: id }, team)
}
async function delteam(id) {
    return await teamModel.findByIdAndUpdate(id, { isActive: false })
}

exports = module.exports = { create, readOne, readMany, update, delteam, addnewuser, readAll, removework , addnewwork }