import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { fetchTeamUsers } from "./utils/fetchTeamUsers.mjs";
import { fetchUserSendLink } from "./utils/fetchUserSendLink.mjs";
import { writeFileJson } from "./utils/writeFileJson.mjs";
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  let message = `Please use this bot to get status of Nyumbani mates team members that are online on Lichess`;

  ctx.reply(message);
  try {
    const newLocal = await writeFileJson(ctx.chat.id);
    console.log(newLocal);
  } catch (error) {
    console.log(error);
  }
});

let users = await fetchTeamUsers();
await fetchUserSendLink(users);

bot.launch();
