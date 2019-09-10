const fs = require('../../tools/fs');
const Discord = require('discord.js');
const filename = 'memory/deaths.json'

function printer(context) {
  return fs.readFile(filename).then(fd => {
    let embed = new Discord.RichEmbed();

    let data = JSON.parse(fd);
    for (id in data) {
      embed.addField(data[id].name, data[id].deaths);
    }

    embed.setTitle(`Current Death Counts`);

    return context.channel.send(embed);
  });
}

exports.run = printer;
exports.key = 'deaths';