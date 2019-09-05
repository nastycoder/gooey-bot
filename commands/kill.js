const file = require('fs');
const filename = '../memory/deaths.json';

function kill(msg, context){

  // Filter out bot mentions
  const mentions = context.mentions.users.filter((user) {
    return user !== bot.user;
  });
  
  // If nobody else is mentioned in the message, quit here
  if (!mentions.length) return;
  
  // Increment the death counter for all mentioned members
  function apendDeaths(memory, fd) {
    // Iterate over mentioned users and increment their death counter
    mentions.forEach((value, key){
      if (value in memory) {
        memory[value]++;
      } else {
        memory[value] = 1;
      }
    });
    // Write to memory and send a reply when finished
    file.writeFile(fd, JSON.stringify(memory), (error) {
      // Send a reply after everything else is done
      file.close(fd, () {
        context.channel.send('You got it!');
      });
    })
  }
  
  // Try to open the memory file, if it fails assume that the file is fucked and start over
  file.open(filename, 'a+', (error, fd) {
    file.readFile(fd, (error, data){
      try {
        appendDeaths(JSON.parse(data), fd);
      } catch (error) {
        appendDeaths({}, fd);
      }
    });
  });
  
};

exports.run = kill;
exports.key = 'kill';
