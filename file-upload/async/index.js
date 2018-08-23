const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert');
const static = require('koa-static');
const {uploadFile} = require('./util/upload');

const app = new Koa();

// 使用第三方中间件 start
app.use(views(path.join(__dirname,'./view'),{extension:'ejs'}));

const staticPath = './static';
app.use(convert(static(path.join(__dirname,staticPath))));

//使用第三方中间件 end

app.use(async (ctx)=>{
    if(ctx.method === 'GET'){
        let title = 'upload pic async';
        await ctx.render('index',{title});
    }else if(ctx.url === '/api/picture/upload.json' && ctx.method === 'POST'){
        //上传文件处理
        let result = {success:false};
        let serverFilePath = path.join(__dirname,'static/image');

        //上传文件事件
        result = await uploadFile(ctx,{
            fileType:'album',
            path:serverFilePath
        });
        ctx.body = result;
    }else{
        ctx.body = '<h1>404!!!</h1>';
    }
})

app.listen(3000,()=>{
    console.log('[demo] upload-pic-async is starting at port 3000');
})