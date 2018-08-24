const Koa = require('koa');
const jsonp = require('koa-jsonp');
const app = new Koa();

app.use(jsonp());

app.use(async (ctx)=>{
    let returnData = {
        success:true,
        data:{
            text:'this is a jsonp api writen by koa-jsonp',
            time:new Date().getTime()
        }
    }
    ctx.body = returnData;
});

app.listen(3000);