import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { fetchUserSendLink } from "./utils/fetchUserSendLink.js";
import { writeFileJson } from "./utils/writeFileJson.js";
import { users } from "./utils/createDictUsers.js"
import {removeFileJson} from "./utils/removeFileJson"
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async(ctx) => {
  let message = `Please use this bot to get status of Nyumbani mates team members that are online on Lichess`;
  try {
    ctx.reply(message);
    writeFileJson(ctx.chat.id);
 } catch (error) {
       console.log("error", error);
       
 }
  
  
});



bot.command('stop', async (ctx) => {
    try {
       
      removeFileJson(ctx.chat.id)
       
    } catch (error) {
        console.log('error', error)
        ctx.reply('Error unsubscribing you to notifications ')
    }
})

bot.launch()

fetchUserSendLink(users);

bot.launch();
