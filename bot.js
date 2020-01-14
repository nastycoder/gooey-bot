const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = require('./commands');
// const prefix = '';

bot.on('message', context => {
  console.log(context);
  if (!context.mentions.users.has(bot.user.id)) {
    return;
  }

  const msg = context.content.toLowerCase()
                .replace(`<@!${bot.user.id}>`, '')
                .replace(`<@${bot.user.id}>`, '')
                .trim()
                .split(' ');
  console.log(msg)
  const com = msg.shift();

  if (!!commands[com]) {
    commands[com](msg, context);
  }
});

bot.on('ready', () => {});

bot.on('guildCreate', (guild) => {
  // do some guildy stuff
});

bot.login(process.env['GOOEY_TOKEN']);
