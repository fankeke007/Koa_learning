const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    if(ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp'){
        console.log(ctx.url);
        let callbackName = ctx.query.callback || 'callback';
        let returnData = {
            success:true,
            data:{
                text:'this is a jsonp api',
                time:new Date().getTime()
            }
        }

        //jsonp的script字符串
        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

        //用text/javascript，让请求支持跨域
        ctx.type = 'text/javascript';

        ctx.body = jsonpStr;
    }else{
        ctx.body = 'hello jsonp';
    }
});
app.listen(3000,()=>{
    console.log('[demo] jsonp is starting at port 3000');
});

