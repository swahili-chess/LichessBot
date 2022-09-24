import { fetchTeamUsers } from "./fetchTeamUsers.mjs";
const gamesObj = {};

try {
  const resUserList = await fetchTeamUsers();
  for (let user of resUserList) {
    gamesObj[user.toLowerCase()] = [];
  }
} catch (error) {
  console.log(error);
}

 

export { gamesObj };
