import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
};

export async function fetchTeamUsers() {
  const res = await fetch("https://lichess.org/api/team/nyumbani-mates/users", {
    headers,
  });

  const resjson = await res.text();

  let results = resjson.split("\n");

  results = results.slice(0, results.length - 1);

  const userIdArray = [];

  for (let resObj of results) {
    let parsedOBj = JSON.parse(resObj);
    userIdArray.push(parsedOBj["id"]);
  }

  return userIdArray;
}
