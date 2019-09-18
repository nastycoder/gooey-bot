const fs = require('../../tools/fs');
const Discord = require('discord.js');
const filename = 'memory/deaths.json'

function printer(context) {
  return fs.readFile(filename).then(fd => {
    let embed = new Discord.RichEmbed();

    let data = JSON.parse(fd);
    let sorted = Object.entries(data).sort((a, b) => b[1].deaths > a[1].deaths);
    /*
    for (id in data) {
      embed.addField(data[id].name, data[id].deaths);
    }
    */
    
    for (id in sorted) { // [ [key, value], [key, value] ]
      embed.addField(sorted[id][1].name, sorted[id][1].deaths, true /*inline*/);
    }
    
    embed.setTitle(`Current Death Counts`);

    return context.channel.send(embed);
  });
}

exports.run = printer;
exports.key = 'deaths';
