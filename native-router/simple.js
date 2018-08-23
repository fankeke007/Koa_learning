//可以通过ctx.request.url 拿到当前访问的路径，
//因而可以通过对当前路径做相应的匹配操作来控制路由

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    let url = ctx.request.url;
    ctx.body = url;
});

app.listen(3000);