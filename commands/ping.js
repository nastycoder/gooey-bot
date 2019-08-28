function ping(_, context) {
  context.channel.send(`pong`);
};

exports.run = ping;
exports.key = 'ping';
