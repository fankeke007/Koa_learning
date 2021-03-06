const Koa = require('koa');
const path = require('path');
const content = require('./util/content');
const mimes = require('./util/mimes');

const app = new Koa();

//静态资源目录相对index.js的路径
const staticPath = './static';

//解析资源类型
function parseMine(url){
    let extName = path.extname(url);
    extName = extName ? extName.slice(1) : 'unknown';
    return mimes[extName];
};

//
app.use(async (ctx)=>{
    //静态目录本地绝对路径
    let fullStaticPath = path.join(__dirname,staticPath);

    //获取静态资源内容
    let _content = await content(ctx,fullStaticPath);

    // console.log(_content);

    //解析请求内容类型
    let _mime = parseMine(ctx.url);

    //若有对应文件类型就配置上下文类型
    if(_mime){
        ctx.type = _mime;
    }

    //输出静态资源内容
    if(_mime && _mime.indexOf('image/') >= 0 ){
        //若为图片，则用node原生res,输出二进制数据
        ctx.res.writeHead(200);
        ctx.res.write(_content,'binary');
        ctx.res.end();
    }else{
        //其他则输出文本
        ctx.body = _content;
        // ctx.res.writeHead(200,{
        //     'content-type':ctx.type,
        //     'Transfer-Encoding':'utf-8'
        // });
        // ctx.res.write(_content,'utf8');
        // ctx.res.end();
        
    }
});

app.listen(3000);



