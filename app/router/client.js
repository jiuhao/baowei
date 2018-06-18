const Router = require('koa-router');
const adminService = require('../service/admin/adm');
const articleService = require('../service/article');
const messageService = require('../service/message');
const fileService = require('../service/file');
const router = new Router();
const Redis = require('../common/redis');
const uuid = require('uuid');

router.post("/login", async(ctx)=> {
    let sessionId = uuid.v1();
    ctx.data = await await adminService.login(ctx.request.body);
    try {
        await Redis.set(sessionId, JSON.stringify(ctx.data));
    } catch (e) {
        throw e;
    }
    ctx.data.token = sessionId;
});

// 查看最新发布
router.get("/home/publish/get", async(ctx)=> {
    ctx.data = await articleService.getHome();
});


// 查看块数据
router.get("/home/block", async(ctx)=> {
    ctx.data = await articleService.getBlock(ctx.request.body);
});

// 分类查询列表
router.post("/article/list", async(ctx)=> {
    ctx.data = await articleService.listByClient(ctx.request.body);
});

// 查看详情
router.post("/article/load", async(ctx)=> {
    ctx.data = await articleService.loadByClient(ctx.request.body);
});

// 查看文件列表
router.get("/file/block/get", async(ctx)=> {
    ctx.data = await fileService.getBlock();
});

// 查看文章图片列表
router.get("/banner/block/list", async(ctx)=> {
    ctx.data = await articleService.listBlockBanner();
});

// 新增留言
router.post("/message/add", async(ctx)=> {
    ctx.data = await messageService.add(ctx.request.body);
});

// 文件列表
router.post("/file/list", async(ctx)=> {
    ctx.data = await fileService.list(ctx.request.body);
});



module.exports = router;