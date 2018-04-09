const fs = require("fs"),
    path = require("path"),
    colors = require('colors'),
    pwd = process.cwd(),
    tpl = require("../template/tpl.js");

const createDir = function (name, dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(pwd, dir, name), (err) => {
            if (err && err.code !== 'EEXIST') 
                throw err;
            console.log(` ---> Create Directory\t${name} ---> success...`);
            resolve();
        });
    });
}

const createFile = function (name, fileCtx, dir) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(pwd, dir, name), fileCtx, (err) => {
            if (err && err.code !== 'EEXIST') 
                throw err;
            console.log(` ---> Create File\t${name} ---> success...`);
            resolve();
        });
    });
}

module.exports = async function (cName) {

}