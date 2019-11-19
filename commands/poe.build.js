const fs = require('../tools/fs');

// Setup the dataset right off the bat so we aren't waiting around for it later.
let MANUAL_DATA;

fs.readFile(`./manual-data/poe.build.json`).then(json => {
  MANUAL_DATA = JSON.parse(json);
});

async function poebuild(msg, context) {
  // if for whatever reason we haven't finished setting, just bail
  if (!MANUAL_DATA) {
    return context.channel.send(`I've got nothing to work with here!!`);
  }

  let klass = getRandom(MANUAL_DATA.classes);
  let ascendancy = getRandom(klass.ascendancies);
  let color = getRandom(ascendancy.skill_colors);
  let skill = getRandom(MANUAL_DATA.active_skills[color]);

  return context.channel.send(`${klass.name} / ${ascendancy.name} / ${skill}`);
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
}

exports.run = poebuild;
exports.key = 'poebuild';