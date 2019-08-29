const baseUrl = 'https://www.lmgtfy.com/?q=';

function lmgtfy(msg, context) {
  let reply;

  function send(query) {
    query = query.join(' ');
    // make sure we escape any weird shit the user put into this query.
    const q = encodeURIComponent(query); 
    return context.channel.send(query, {
      embed: {
        url: `${baseUrl}${q}`
      }
    });
  }

  // if they didn't provide a message, assume they are trolling whoever posted just before them.
  if (!msg.length) {
    reply = context.channel.fetchMessages({ 
      limit: 1, before: context.id 
    }).then( messages => {
      // mapping here just in case messages is an empty array but the 
      // length never be more than one.
      messages.map(m => send([m.content]));
    });
  } else {
    reply = send(msg)
  }

  return reply.then( () => {
    return context.delete();
  }).catch(e => {
    console.error(`lmgtfy`, context.toString(), e);
  });
};

exports.run = lmgtfy;
exports.key = 'lmgtfy';