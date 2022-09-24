import fetch from "node-fetch";
import { fetchUSerStatus } from "./fetchUserStatus.mjs";

export async function fetchUserSendLink(users) {
  function showResult(message) {
    console.log(message);
  }

  await fetchUSerStatus(users);
}
