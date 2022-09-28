# Lichess Telegram Bot

I needed to have to a telegram text message sent to me of a game played by any member of [Nyumbani Mates](https://lichess.org/team/nyumbani-mates) 
team at [Lichess.org](https://lichess.org/). So i decided to create this Bot that checks if the player is online and current playing chess at [Lichess.org](https://lichess.org/) and send me the link of the Game via Telegram.

# Setup

 - Get a [Telegram API KEY](https://my.telegram.org/apps) and a bot token from [Bot Father](https://t.me/botfather).
 - Get Lichess access token from [Generate access token](https://lichess.org/account/oauth/token)
 - Create a .env file and insert LiCHESS_TOKEN="your token from lichess" and BOT_TOKEN="from Bot father"
 

# How to use
Clone the repository:
```bash
git clone https://github.com/Hopertz/LichessBot.git
```

Install the requirements:
```bash
cd LichessBot
npm install
```

Then run the bot with:
```javascript
node main.mjs
```

Go to the Telegram Bot you created using Bot Father and click Start, and you will receive text message link of player that will be online and playing who is a member of [Nyumbani Mates](https://lichess.org/team/nyumbani-mates).

**Note:** If you are using a server you can make a simple `Systemd` script to let the bot run in the background.

# License

[MIT](https://choosealicense.com/licenses/mit/)
