const fs = require('../tools/fs');

async function show(msg, context) {
  return Promise.all(
    msg.map((filename) => {
      return fs.readFile(`memory/${filename}.json`).then(fd => {
        context.channel.send(`
        \`\`\`json
        ${fd}
        \`\`\`
        `)
      }).catch(console.error);
    })
  );
}

exports.run = show;
exports.key = 'show';