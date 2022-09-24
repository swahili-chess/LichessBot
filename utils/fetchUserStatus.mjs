import fetch from "node-fetch";
import { getLinkGames } from "./getLinkOfGames.mjs";
const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
};

export async function fetchUSerStatus(users) {
  console.log(`i entered fetchuserStatus`);
  let url = "https://lichess.org/api/users/status?ids=";
  let fullUrl = url.concat(users.join().toLowerCase());
  const response = await fetch(fullUrl, { headers });

  if (response.status === 502) {
    // Connection timeout.
    // May happen if connection has waited for too long.
    await fetchUSerStatus(users);
  } else if (response.status !== 200) {
    // Show the message and reconnect after  1 minute

    await new Promise((resolve) => setTimeout(resolve, 60000));
    await fetchUSerStatus(users);
  } else {
    // Accept the Json
    const usersStatusRes = await response.json();

    try {
      await getLinkGames(usersStatusRes);
    } catch (error) {
      console.log(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 6000));
    await fetchUSerStatus(users);
  }
}
