import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { fetchUserSendLink } from "./utils/fetchUserSendLink.js";
import { writeFileJson } from "./utils/writeFileJson.js";
import { users } from "./utils/createDictUsers.js"
import {removeFileJson} from "./utils/removeFileJson.js"
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  let message = `Please use this bot to get link of games of Nyumbani mates team members that are actively playing on Lichess. Type /stop to stop receiving notifications`;
  try {
    ctx.reply(message);
    writeFileJson(ctx.chat.id);
  } catch (error) {
    console.log("error", error);
  }
});

bot.command("stop", async (ctx) => {
  try {
    const res = await removeFileJson(ctx.chat.id);
    if (res) {
      ctx.reply(
        "Sorry to see you leave You wont be receiving notifications. Type /start to receive "
      );
    } else {
      ctx.reply(
        "You have already unsubcscribe in receiving notifications.Type /start to receive"
      );
    }
  } catch (error) {
    ctx.reply("Error unsubscribing you to notifications ");
  }
});


//fetchUserSendLink(users);

bot.launch();
