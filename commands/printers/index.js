const printers = [
  require('./deaths')
];

module.exports = printers.reduce((all, cur) => {
  all[cur.key] = cur.run;
  return all;
}, {});