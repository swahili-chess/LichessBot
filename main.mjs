import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { fetchTeamUsers } from "./utils/fetchTeamUsers.mjs";
import { fetchUserSendLink } from "./utils/fetchUserSendLink.mjs";
import { writeFileJson } from "./utils/writeFileJson.mjs";
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx, err) => {
  let message = `Please use this bot to get status of Nyumbani mates team members that are online on Lichess`;
  if (err) {
    console.log(err);
  }
  ctx.reply(message);
  writeFileJson(ctx.chat.id)
});

let users = await fetchTeamUsers();
fetchUserSendLink(users);

bot.launch();
