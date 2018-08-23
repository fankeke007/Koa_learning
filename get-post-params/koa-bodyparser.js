const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

//使用bodyParse中间件解析post参数
app.use(bodyParser());

app.use(async (ctx)=>{
    if(ctx.url === '/' && ctx.method === 'GET'){
        let html = `
            <h1>Koa2 request post demo<h1>
            <form method="post" action="/">
                <p>userName</p>
                <input name="userName"/><br/>
                <p>nickName</p>
                <input name="nickName"/><br/>
                <p>email</p>
                <input name="email"/><br/>
                <button type="submit">submit</button>
            </from>
        `
        ctx.body = html;
    }else if(ctx.url === '/' && ctx.method === 'POST'){
        // let postData = await parsePostData(ctx);
        //post 请求是中间间bodyParser 解析POST表单数据并显示出来
        let postData = ctx.request.body;
        ctx.body = postData;
    }else{
        ctx.body = '<p>404!!!</p>';
    }
});

app.listen(3000);