const Koa = require('koa');
const loggerAsync = require('./async-in-middleware.js');
const app = Koa();

app.use(loggerAsync());

app.use((ctx)=>{
    ctx.body = 'Hello world!';
});

app.listen(3000);

console.log('the server is starting at prot 3000');