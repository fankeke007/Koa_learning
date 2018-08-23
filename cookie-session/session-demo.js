const Koa = require('koa');
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');

const app = new Koa();

//config mysql
let store = new MysqlSession({
    user:'root',
    password:'a123456',
    database:'koa_demo',
    host:'127.0.0.1'
});

//config cookie
let cookie = {
    maxAge:'',
    expires:'',
    path:'',
    domain:'',
    httpOnly:'',
    overwrite:'',
    secure:'',
    sameSite:'',
    signed:''
}

//
app.use(session({
    key:'SESSION_ID',
    store:store,
    cookie:cookie
}));

app.use(async (ctx)=>{
    if(ctx.url === '/set'){
        ctx.session = {
            user_id:Math.random().toString(36).substr(2),
            count:0
        }
        ctx.body = ctx.session;
    }else if(ctx.url === '/'){
        ctx.session.count = ctx.session.count + 1;
        ctx.body = ctx.session;
    }
});

app.listen(3000);