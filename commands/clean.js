const fs = require('../tools/fs');

async function clean(msg, context) {
  // if whoever posted this is not the guild owner
  if (context.guild.ownerID !== context.author.id) {
    return context.channel.send('Not gonna do that!');
  }
  return Promise.all(
    msg.map((file) => {
      return fs.unlink(`./memory/${file}.json`);
    })
  ).then( _ => {
    context.channel.send(`All cleaned up boss!`);
  }).catch(e => {
    console.error(e);
    context.channel.send(`Houston, we had a problem!`);
  });
}

exports.run = clean;
exports.key = 'clean';