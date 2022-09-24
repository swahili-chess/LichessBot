import fetch from "node-fetch";
import { fetchUSerStatus } from "./fetchUserStatus.mjs";

export async function fetchUserSendLink(users) {
  console.log("I entered fetchUserSendLink");
  try {
    await fetchUSerStatus(users);
  } catch (error) {
    console.log(error);
  }
  
}
