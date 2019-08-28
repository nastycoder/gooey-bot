const baseUrl = 'https://www.lmgtfy.com/?q=';

function lmgtfy(msg, context) {
  // make sure we escape any weird shit the user put into this query.
  const q = encodeURIComponent(msg.join(' ')); 
  context.channel.send(`<${baseUrl}${q}>`);
  if (context.deletable) {
    context.delete();
  }
};

exports.run = lmgtfy;
exports.key = 'lmgtfy';