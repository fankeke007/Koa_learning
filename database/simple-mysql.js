const mysql = require('mysql');

//创建一个连接示例
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'a123456',
    database:'koa_demo'
});
connection.query('',(error,results,fields)=>{
    if(error){
        throw error;
    }
    console.log(result);
    connection.release();
});

//创建一个连接池示例，减少连接参数配置次数
const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'a123456',
    database:'koa_demo'
});
pool.getConnection(function(err,connection){
    if(error){
        throw error;
    }
    console.log(result);
    connection.release();
});

//promise 封装mysql模块
let query = function(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,row)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

module.exports = {query};

