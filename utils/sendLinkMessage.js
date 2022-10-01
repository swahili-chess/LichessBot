import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

export async function sendLinkMessage(id, currentGameUrl) {
  try {
    await bot.telegram.sendMessage(id, currentGameUrl);
  } catch (e) {
    console.log("Error sending text", e);
  }
}
