const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
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
        let postData = await parsePostData(ctx);
        ctx.body = postData;
    }else{
        ctx.body = '<p>404!!!</p>';
    }
});

//parsePostData
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata = '';
            ctx.req.addListener('data',(data)=>{
                postdata += data;
            })
            ctx.req.addListener('end',function(){
                let postData = parseQueryStr(postdata);
                resolve(postData);
            })
        }catch(err){
            reject(err);
        }
    })
}

//parse postData to json
function parseQueryStr(queryStr){
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for(let[index,queryStr] of queryStrList.entries()){
        let itemList = queryStr.split('=');
        queryData[itemList[0]]=decodeURIComponent(itemList[1]);
    }
    return queryData;
}
app.listen(3000);