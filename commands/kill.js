const file = require('fs');
const filename = '../memory/deaths.json';

function kill(msg, context){

  // Filter out bot mentions
  const mentions = context.mentions.users.filter((user) => !bot.user);
  
  // If nobody else is mentioned in the message, quit here
  if (!mentions.length) return;
  
  // Increment the death counter for all mentioned members
  function appendDeaths(memory) {
    // Iterate over mentioned users and increment their death counter
    mentions.forEach((value, key){
      if (value in memory) {
        memory[value]++;
      } else {
        memory[value] = 1;
      }
    });
    // Write to memory and send a reply when finished
    file.writeFile(filename, JSON.stringify(memory), (error) {
      // Send a reply after everything else is done
      context.channel.send('You got it!');
    })
  }
  
  // Try to open the memory file, if it fails assume that the file is fucked and start over
  file.readFile(filename, (error, data){
    if (!error){
      try {
        appendDeaths(JSON.parse(data));
      } catch (error) {
        appendDeaths({});
      }
    } else {
      appendDeaths({});
    }
  });
  
};

exports.run = kill;
exports.key = 'kill';
