const koa = require('koa');
const app = new koa();
require('./appConfig')
require('../tools');

var router = require('koa-router')()

router.get('/aa', function* () {
    var d = yield request('http://wx.dotnar.com/allApis',{
        method:'get',
        headers:{
            'Content-Type':'application/json'
        },
        data:JSON.stringify({
            username:'dotnar',
            password:'123456'
        })
    });
    // console.log(d)
    this.body = d
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(555)
