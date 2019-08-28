const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = require('./commands');
const prefix = ''; // removed the prefix for now

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
  // do something we're all fired up
  // console.log('something is happening');
});

bot.on('guildCreate', (guild) => {
  // do some guildy stuff
});

bot.login(process.env['GOOEY_TOKEN']);