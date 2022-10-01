import fetch from "node-fetch";
import { getLinkGames } from "./getLinkOfGames.js";
const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
};

export async function fetchUSerStatus(users) {
  let url = "https://lichess.org/api/users/status?ids=";
  let fullUrl = url.concat(users.join().toLowerCase());
  const response = await fetch(fullUrl, { headers });

  if (response.status === 502) {
    // Connection timeout.
    // May happen if connection has waited for too long.
    setImmediate(() => fetchUSerStatus(users));
  } else if (response.status !== 200) {
    // Show the message and reconnect after  1 minute

    await new Promise((resolve) => setTimeout(resolve, 60000));
    setImmediate(() => fetchUSerStatus(users));
  } else {
    // Accept the Json
    const usersStatusRes = await response.json();

    getLinkGames(usersStatusRes);

    await new Promise((resolve) => setTimeout(resolve, 6000));
    setImmediate(() => fetchUSerStatus(users));
  }
}
