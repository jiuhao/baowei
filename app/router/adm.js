const Router = require('koa-router');
const adminService = require('../service/admin/adm');
const articleService = require('../service/admin/article');
const fileService = require('../service/admin/file');
const itemService = require('../service/admin/item');
const permissionService = require('../service/admin/permission');
const roleService = require('../service/admin/role');
const messageService = require('../service/admin/message');
var router = new Router({
    prefix: '/admin'
});

router.get("/info", async(ctx)=> {
    ctx.data = ctx.user;
});

router.post("/add", async(ctx)=> {
    ctx.data = await adminService.add(ctx.request.body);
});

router.post("/list", async(ctx)=> {
    ctx.data = await adminService.list(ctx.request.body);
});

router.post("/update", async(ctx)=> {
    ctx.data = await adminService.update(ctx.request.body);
});

router.post("/delete", async(ctx)=> {
    ctx.data = await adminService.delete(ctx.request.body);
});

router.post("/article/add", async(ctx)=> {
    ctx.data = await articleService.add(ctx.request.body, ctx.user);
});

router.post("/article/list", async(ctx)=> {
    ctx.data = await articleService.list(ctx.request.body);
});

router.post("/article/update", async(ctx)=> {
    ctx.data = await articleService.update(ctx.request.body);
});

router.post("/article/load", async(ctx)=> {
    ctx.data = await articleService.load(ctx.request.body);
});

router.post("/file/add", async(ctx)=> {
    ctx.data = await fileService.add(ctx);
});

router.post("/file/list", async(ctx)=> {
    ctx.data = await fileService.list(ctx.request.body);
});

router.post("/item/add", async(ctx)=> {
    ctx.data = await itemService.add(ctx.request.body);
});

router.get("/item/list", async(ctx)=> {
    ctx.data = await itemService.list();
});

router.post("/permission/add", async(ctx)=> {
    ctx.data = await permissionService.add(ctx.request.body);
});

router.get("/permission/list", async(ctx)=> {
    ctx.data = await permissionService.list(ctx.request.body);
});

router.post("/permission/delete", async(ctx)=> {
    ctx.data = await permissionService.delete(ctx.request.body);
});

router.post("/role/add", async(ctx)=> {
    ctx.data = await roleService.add(ctx.request.body);
});

router.post("/role/load", async(ctx)=> {
    ctx.data = await roleService.load(ctx.request.body);
});

router.get("/role/list", async(ctx)=> {
    ctx.data = await roleService.list(ctx.request.body);
});

router.post("/message/list", async(ctx)=> {
    ctx.data = await messageService.list(ctx.request.body);
});

router.post("/message/add", async(ctx)=> {
    ctx.data = await messageService.add(ctx.request.body);
});

router.post("/message/answer", async(ctx)=> {
    ctx.data = await messageService.answer(ctx.request.body);
});

module.exports = router;