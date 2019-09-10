const fs = require('../tools/fs');
const DeathPrinter = require('./printers/deaths');
const filename = 'memory/deaths.json';

function merge(og, knew) {
  for (id in knew) {
    if (og[id]) { 
      og[id].deaths++;
    } else {
      og[id] = { deaths: 1, name: knew[id].username };
    }
  }

  return og;
}

async function kill(_, context){
  let updates, stored;

  [...context.mentions.users.values()].forEach((user) => {
    // if the user is a bot, bail;
    if (user.bot){ return; }
    // if this is the first update we've found, make an object to store shit in.
    if (!updates) { updates = {}; }
    updates[user.id] = user;
  });
  
  // Try to open the memory file, if it fails assume that the file is fucked and start over
  stored = await fs.readFile(filename).then((data) => {
    return JSON.parse(data);
  }).catch(() => {
    return {};
  });

  merge(stored, updates);

  // Write to memory and send a reply when finished
  return fs.writeFile(filename, JSON.stringify(stored)).then(() => {
    context.channel.send(`You got it!`);

    return DeathPrinter.run(context);
  }).catch((e) => {
    console.error(e);
    context.channel.send('Something went wrong boss.');
  });
};

exports.run = kill;
exports.key = 'kill';
