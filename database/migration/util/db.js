const mysql = require('mysql');

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'a123456',
    database:'koa_demo'
});

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