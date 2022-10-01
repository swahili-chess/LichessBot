import fetch from "node-fetch";
import { fetchUSerStatus } from "./fetchUserStatus.js";

export async function fetchUserSendLink(users) {
  try {
    await fetchUSerStatus(users);
  } catch (e) {
    console.log("Error in fetching users", e);
  }
}
