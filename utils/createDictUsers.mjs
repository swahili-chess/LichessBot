import { fetchTeamUsers } from "./fetchTeamUsers.mjs";
const gamesObj = {};

try {
  const resUserList = await fetchTeamUsers();
  for (let user of resUserList) {
    gamesObj[user.toLowerCase()] = [];
  }
} catch (e) {
  console.log("Error creating a dict of users",e);
}

 

export { gamesObj };
