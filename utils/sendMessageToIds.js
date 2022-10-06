import { sendLinkMessage } from "./sendLinkMessage.js";

export async function sendMessageToIds(userIds,currentGameUrl) {
  for (let id of userIds) {
    try {
      await sendLinkMessage(id, currentGameUrl);
    } catch (e) {
      console.log("Error Sending the game link", e);
    }
  }
}
