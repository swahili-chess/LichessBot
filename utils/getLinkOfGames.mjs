import fetch from "node-fetch";

import { gamesObj } from "./createDictUsers.mjs";
import { pathToJSon } from "./writeFileJson.mjs";
import { readFileReturnIds } from "./readFileReturnIds.mjs";
import { sendLinkMessage } from "./sendLinkMessage.mjs";

const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
};

export async function getLinkGames(usersStatusRes) {
  for (let userObj of usersStatusRes) {
    if (userObj["playing"] && userObj["online"]) {
      let getGameUrl = `https://lichess.org/api/user/${userObj["id"]}/current-game?moves=false&pgnInJson=true&clocks=false&evals=false&opening=false`;
      try {
        const res = await fetch(getGameUrl, { headers });
        let resText = await res.text();
        const currentGameUrl = resText
          .split("]")[1]
          .split(" ")[1]
          .replace(/['"]+/g, "");

        let arrayOfGames = gamesObj[userObj["id"]];
        if (arrayOfGames.length === 0) {
          arrayOfGames.push(currentGameUrl);
          gamesObj[userObj["id"]] = arrayOfGames;

          let userIds = await readFileReturnIds(pathToJSon);

          for (let id of userIds) {
            try {
              await sendLinkMessage(id, currentGameUrl);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          let lastGameUrl = arrayOfGames[arrayOfGames.length - 1];

          if (lastGameUrl != currentGameUrl) {
            arrayOfGames.push(currentGameUrl);
            gamesObj[userObj["id"]] = arrayOfGames;

            userIds = await readFileReturnIds(pathToJSon);
            for (let id of userIds) {
              try {
                await sendLinkMessage(id, currentGameUrl);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 60000));
      } catch (error) {
        console.log("Unable to fetch user current game", error);
      }
    }
  }
}
