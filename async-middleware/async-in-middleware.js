const {log} = consle;
function selfLog(ctx){
    log(ctx.method,ctx.header.host + ctx.url);
};
module.exports = function(){
    return async (ctx,next) => {
        log(ctx);
        await next();
    }
}