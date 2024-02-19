const employeeController = require('../BL/controllers/employee.controller')
const teamController = require('../BL/controllers/team.controller')

async function createNewEmp(data) {
    if (!data.eName) {
        throw new Error("Please enter a name");
    }
    if (!data.email) {
        throw new Error("Please enter an email");
    }
    if (!data.password) {
        throw new Error("Please enter a password");
    }
    const user = await employeeController.readOne({ email: data.email })
    if (user) {
        throw new Error("User already exists");
    }
    const employee = {
        eName: data.eName,
        email: data.email,
        password: data.password,
        permission: data.permission,
        work: data.work,
        phon: data.phon,
    }
    const newemp = await employeeController.create(employee)
    teamController.addnewuser("65cdc0462ed27ccad7a3ca7d", newemp._id);
    return newemp
     
}

async function readOneEmp(filter) {
    return await employeeController.readOne(filter)
}

async function loginEmp(data){
    const user = await employeeController.readOne({ phon: data.phon })
    if (!user) {
        throw new Error("User does not exist");
    }
    console.log(user)
    if (user.email !== data.email) {
        throw new Error("Wrong details");
    }
    return user
}

// loginEmp({
//     phon: "0542495211",
//     email: "or@gmnkj.iho"
// });

async function readAllEmp(filter) {
    return await employeeController.readAll(filter)
}
async function updateEmp(id, data) {
    const employee = {
        name: data.name,
        email: data.email,
        password: data.password,
        permission: data.permission,
        work: [work, ...data.work],
        phon: data.phon,
    }
    return await employeeController.update(id, employee)
}

async function deleteEmp(id) {
    // 1. מצא את העובד שברצונך למחוק
    const employee = await employeeController.readOne({ _id: id });
    if (!employee) {
        throw new Error("User does not exist");
    }

    // 2. מצא את כל הקבוצות שהעובד שייך אליהן
    const teams = await teamController.readMany({ id: id });
    if (!teams || teams.length === 0) {
        throw new Error("Employee is not part of any team");
    }

    // 3. עבור על כל קבוצה ומחק את העובד מרשימת העובדים בה
    const promises = teams.map(async (team) => {
        const updatedTeamUsers = team.teamUsers.filter(user => user._id.toString() !== id);
        const updatedTeam = {
            teamUsers: updatedTeamUsers,
        };
        await teamController.updateteam(team._id, updatedTeam);
    });

    // המתן לסיום כל הפעולות
    await Promise.all(promises);

    // 4. מחיקת העובד ממסד הנתונים
    return await employeeController.delete(id);
}




module.exports = { createNewEmp, readOneEmp, readAllEmp, updateEmp, deleteEmp, loginEmp }