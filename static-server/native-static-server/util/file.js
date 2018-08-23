const fs = require('fs');


function file(filePath){
    let content = fs.readFileSync(filePath,'binary');
    // let content = fs.readFileSync(filePath,{encoding:'utf8'});
    return content;
}

module.exports = file;