import { fetchTeamUsers } from "./fetchTeamUsers.mjs";
const gamesObj = {};

fetchTeamUsers().then(resUserList => {
   for (let user of resUserList) {
     gamesObj[user.toLowerCase()] = [];
   }
 
})

export { gamesObj };
