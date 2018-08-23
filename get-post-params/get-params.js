const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    let url = ctx.url;
    //get from request
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    //get from ctx
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    // let hash = ctx.hash; //ctx has no hash property

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring,
    }
})
app.listen(3000);