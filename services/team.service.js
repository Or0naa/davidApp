const teamController = require('../BL/controllers/team.controller')
const employeeController = require('../BL/controllers/employee.controller')

async function createNewTeam(data) {
    if (!data.teamName) {
      throw new Error("Please enter a team name");
    }
    if (!data.teamUsers || data.teamUsers.length === 0) {
      throw new Error("Please enter team users");
    }
  
    // Validate that all team users exist
    const existingUsersPromises = data.teamUsers.map(async (userId) => {
      const user = await employeeController.readOne({ _id: userId });
      if (!user) {
        throw new Error(`User with ID ${userId} does not exist`);
      }
      return user;
    });
  
    const existingUsers = await Promise.all(existingUsersPromises);
  
    const team = {
      teamName: data.teamName,
      teamUsers: existingUsers,
      isActive: data.isActive,
      color: data.color ? data.color : "#626262",
    };
  
    return await teamController.create(team);
  }
  


async function readOneteam(filter) {
    return await teamController.readOne(filter)
}

async function readAllteam(filter) {
    return await teamController.readAll(filter)
}


async function updateteam(id, data) {
    return await teamController.update(id, data)
}

async function deleteteam(id) {
    return await teamController.delteam(id)
}

module.exports = { createNewTeam, readOneteam, readAllteam, updateteam, deleteteam }