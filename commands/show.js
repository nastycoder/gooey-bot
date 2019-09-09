const printers = require('printers');

async function show(msg, context) {
  return Promise.all(
    msg.map((printer) => {
      if (printers[printer]) {
        return printers[printer](context).catch(e => {
          console.error(e);
          context.channel.send(`Can't see to figure out how to print ${printer}.`);
        });
      } else {
        return context.channel.send(`No known printer by the name of ${printer}.`);
      }
    })
  );
}

exports.run = show;
exports.key = 'show';