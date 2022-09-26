import fetch from "node-fetch";

import { gamesObj } from "./createDictUsers.mjs";
import { pathToJSon } from "./writeFileJson.mjs";
import { readFileReturnIds } from "./readFileReturnIds.mjs";
import { sendMessageToIds } from "./sendMessageToIds.mjs";
let userIds;
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

        const otherPlayerBlack = resText
          .split("]")[4]
          .split(" ")[1]
          .replace(/['"]+/g, "")
          .toLowerCase();

        const otherPlayerWhite = resText
          .split("]")[3]
          .split(" ")[1]
          .replace(/['"]+/g, "")
          .toLowerCase();

        let arrayOfGames = gamesObj[userObj["id"]];

        const otherOppent =
          userObj["id"] == otherPlayerBlack
            ? otherPlayerWhite
            : otherPlayerBlack;
        if (otherOppent in gamesObj) {
          let otherOpponentArray = gamesObj[otherOppent];

          if (
            !(
              arrayOfGames.includes(currentGameUrl) &&
              otherOpponentArray.includes(currentGameUrl)
            )
          ) {
            arrayOfGames.push(currentGameUrl);
            otherOpponentArray.push(currentGameUrl);
            gamesObj[userObj["id"]] = arrayOfGames;
            gamesObj[otherOppent] = otherOpponentArray;

            try {
              userIds = await readFileReturnIds(pathToJSon);
              sendMessageToIds(userIds, currentGameUrl);
            } catch (e) {
              console.log("Error in reading files and return ids", e);
            }
          }
        } else if (arrayOfGames.length === 0) {
          arrayOfGames.push(currentGameUrl);
          gamesObj[userObj["id"]] = arrayOfGames;
          try {
            userIds = await readFileReturnIds(pathToJSon);
            sendMessageToIds(userIds, currentGameUrl);
          } catch (e) {
            console.log("Error in reading files and return ids", e);
          }
        } else {
          let lastGameUrl = arrayOfGames[arrayOfGames.length - 1];

          if (lastGameUrl != currentGameUrl) {
            arrayOfGames.push(currentGameUrl);
            gamesObj[userObj["id"]] = arrayOfGames;
            try {
              userIds = await readFileReturnIds(pathToJSon);
              sendMessageToIds(userIds, currentGameUrl);
            } catch (e) {
              console.log("Error in reading files and return ids", e);
            }
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 60000));
      } catch (e) {
        console.log("Unable to fetch user current game", e);
      }
    }
  }
}
