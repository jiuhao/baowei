const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const ApiError = require('../error/apiError');
const ipAddress = require('ipaddr.js');
const config = require('../config/index');
const logUtil = require('../common/logUtil');
const Redis = require('../common/redis');
const ApiErrorNames = require('../error/apiErrorNames');

const basename = path.basename(module.filename);

// 拦截所有请求
router.all('*', async(ctx, next) => {
    ctx.data = null;
    try {
        let currentIP = getIP(ctx.ip);
        if (currentIP) {
            ctx.ipv4 = currentIP.ipv4;
            ctx.ipv6 = currentIP.ipv6;
        }
        //限制ip
        let ipArray = config.sys.accessip;
        if (ipArray.length == 0 || ipArray.includes(ctx.ipv4)) {  //不做IP限制或满足IP限制的可以访问
            await next();
            if (ctx.data === undefined) {
                ctx.body = {
                    code: 0,
                    msg: '请求成功,但无结果集返回'
                };
                logUtil.reqLogger(ctx);
            } else if (ctx.data === null) {

            } else {
                ctx.body = {
                    code: 1,
                    msg: '请求成功',
                    data: ctx.data
                };
                logUtil.reqLogger(ctx);
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '无法访问!'
            };
            logUtil.reqLogger(ctx);
        }
    } catch (e) {
        //记录日志
        logUtil.logError(e);
        let err;
        if (!(e instanceof ApiError)) {
            err = new ApiError(e.message);
        } else {
            err = e;
        }
        ctx.body = {
            code: err.code,
            msg: err.message,
        };
        logUtil.reqLogger(ctx);
    }
});

// 校验用户（以login方法结尾的请求不验证
router.all(/^\/api\/admin.*/, async(ctx, next) => {
    let sessionId = ctx.request.header['x-token'] || ctx.request.header['X-Token'];
    let result;
    //校验用户是否登录
    if (sessionId) {
        //查看登录的用户信息并赋值给ctx.user
        result = await Redis.get(sessionId);
        if (result) {
            ctx.user = JSON.parse(result);
            await next();
        } else {
            throw new Error(ApiErrorNames.NOT_LOGIN);
        }
    } else {
        throw new Error(ApiErrorNames.NOT_LOGIN);
    }
});

// 扫描router下文件
fs.readdirSync(__dirname).filter(file=>
    (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] === 'js') && (file !== basename)
).forEach(file=> {
    const r = require(path.join(__dirname, file));
    router.use('/api', r.routes(), r.allowedMethods());
});

let getIP = (ip)=> {
    let resultIP = {
        ipv4: '', ipv6: ''
    };
    if (ipAddress.isValid(ip)) {
        if (ipAddress.IPv4.isValid(ip)) {
            // ipString is IPv4
            let currentIPv4 = ipAddress.IPv4.parse(ip);
            resultIP.ipv4 = ip;
            resultIP.ipv6 = currentIPv4.toIPv4MappedAddress();
        } else if (ipAddress.IPv6.isValid(ip)) {
            resultIP.ipv6 = ip;
            let currentIPv6 = ipAddress.IPv6.parse(ip);
            if (currentIPv6.isIPv4MappedAddress()) {
                // ip.toIPv4Address().toString() is IPv4
                resultIP.ipv4 = currentIPv6.toIPv4Address().toString();
            }
        } else {
            // ipString is invalid
            return false
        }
    } else {
        // ipString is invalid
        return false
    }
    return resultIP;
};

module.exports = router;