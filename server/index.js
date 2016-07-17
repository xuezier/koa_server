console.time('app start');
const koa = require('koa');
const app = new koa();
const convert = require('koa-convert');

require('./appConfig');
require('../tools');

const session = require('koa-session');
app.keys = ['keys', 'keykeys'];
app.use(convert(session(app)));

app.use(convert(cors({
    origin: ['*']
})));




app.listen(appConfig.port);
console.timeEnd('app start');
