import { sendLinkMessage } from "./sendLinkMessage.mjs";

export async function sendMessageToIds(userIds,currentGameUrl) {
  for (let id of userIds) {
    try {
      await sendLinkMessage(id, currentGameUrl);
    } catch (e) {
      console.log("Error fetching the game link", e);
    }
  }
}
