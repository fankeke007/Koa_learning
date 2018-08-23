const {log} = console;

function selfLog(ctx){
    log(ctx.method,ctx.header.host+ctx.url);
}

module.export = function(){
    return function* (next){
        selfLog(this);
        if(next){
            yield next;
        }
    }
}