/**
 * All Commands are expected to export `key` and `run` values.
 * `key` should be the string the is expected to enter.
 * `run` should be the function excuting the command.
 *      - This should expect 2 arguments the fist being and Array 
 *        of words entered after the command and the second being 
 *        the original message object (or context as it's referred).
 */


const commands = [
  require('./clean'),
  require('./ping'),
  require('./lmgtfy'),
  require('./kill'),
  require('./show')
];

module.exports = commands.reduce((all, cur) => {
  all[cur.key] = cur.run;
  return all;
}, {});

