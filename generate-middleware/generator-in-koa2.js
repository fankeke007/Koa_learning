const Koa = require('koa');
const conver = require('koa-convert');
const loggerGenerator = require('./logger-generator.js');
const app = new Koa();

app.use(convert(loggerGenerator()));

app.use((ctx)=>{
    ctx.body = 'Hello world!';
});

app.listen(3000);

console.log('the server is starting at prot 3000');


