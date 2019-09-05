const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = require('./commands');
// const prefix = '';

bot.on('message', context => {
  const message = context.content.toLowerCase();
  
  let prefix = bot.user.toString(); // bot responds to @mentions
    
  // If they aren't talking to us, just bail.
  if (!message.startsWith(prefix)) {
    return;
  }
  
  const msg = message.substr(prefix.length).trim().split(' ');
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
