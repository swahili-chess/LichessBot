import { fetchTeamUsers } from "./fetchTeamUsers.mjs";
const gamesObj = {};
let users;

try {
  users = await fetchTeamUsers();
  for (let user of users) {
    gamesObj[user.toLowerCase()] = [];
  }
} catch (e) {
  console.log("Error creating a dict of users", e);
}

export { gamesObj, users };
