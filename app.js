'use strict';
process.env.UV_THREADPOOL_SIZE = 10;

const path = require('path');
const config = require('./app/config');
const koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const convert = require('koa-convert');
const app = new koa();
const router = require('./app/router');

app.use(staticCache(path.join(__dirname, 'upload-files'), {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: true
}));
//允许跨域
app.use(convert(cors()));
//解析请求体
app.use(bodyParser({enableTypes: ['text', 'json', "form"]}));
//路由
app.use(router.routes(), router.allowedMethods());

//解析ipv4
app.listen(config.sys.port, '0.0.0.0', function () {
    console.log(`app start success listen ${config.sys.port}`);
});