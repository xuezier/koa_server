var conf = require('./conf.json') || {};
var argvs = process.argv.slice(2);
argvs.indexOf('-dev') > -1 && (conf.isdev = true);
console.log(conf)