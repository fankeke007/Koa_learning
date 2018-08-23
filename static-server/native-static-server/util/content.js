const path = require('path');
const fs = require('fs');

//封装读取目录方法
const dir = require('./dir');

//封装读取文件内容方法
const file = require('./file');

async function content(ctx,fullStaticPath){
    //请求资源的绝对路径
    let reqPath = path.join(fullStaticPath,ctx.url);

    //判断请求路径是否存在目录或者文件
    let exist = fs.existsSync(reqPath);

    //返回请求内容，默认为空
    let content= '';

    if(!exist){
        //若请求路径或者文件不存在
        content = '404 Not Found!';
    }else{
        //判断是文件还是路径
        let stat = fs.statSync(reqPath);

        if(stat.isDirectory()){
            content = dir(ctx.url,reqPath);
        }else{
            content = await file(reqPath);
        }
    }
    return content;
}

module.exports = content;