const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = require('./commands');
const prefix = '';

bot.on('message', context => {
  const message = context.content.toLowerCase();
  
  // If they aren't talking to us, just bail.
  if (!message.startsWith(prefix)) {
    return;
  }
  
  const msg = message.split(' ');
  const com = msg.shift().replace(prefix, '');

  if (!!commands[com]) {
    commands[com](msg, context);
  }
});

bot.on('ready', () => {
  //prefix = '${bot.user}'; // Use @gooey mentions as the prefix
});

bot.on('guildCreate', (guild) => {
  // do some guildy stuff
});

bot.login(process.env['GOOEY_TOKEN']);
