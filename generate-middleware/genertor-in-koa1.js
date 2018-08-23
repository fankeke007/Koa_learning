const Koa = require('koa');  //koa v1
const loggerGenerator = require('./logger-generator.js');
const app = Koa();

app.use(loggerGenerator());

app.use(function* (){
    this.body = 'Hello world!';
});

app.listen(3000);

console.log('the server is starting at prot 3000');