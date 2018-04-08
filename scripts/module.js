
const fs = require("fs"),
      path = require("path"),
      colors = require('colors'),
      pwd = process.cwd(),
      tpl = require("../template/tpl.js");

      
const moduleStore = fs.readFileSync(path.join(pwd, './src/store/modules/index.js'),'utf-8');
const indexRouter = fs.readFileSync(path.join(pwd, './src/router/index.js'),'utf-8');
const createDir = function(name, dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(pwd, dir, name), (err) => {
            if (err && err.code !== 'EEXIST')
                throw err;
            console.log(` ---> Create Directory\t${name} ---> success...`);
            resolve();
        });
    });
}

const createFile = function(name, fileCtx, dir) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(pwd, dir, name), fileCtx, (err) => {
            if (err && err.code !== 'EEXIST')
                throw err;
            console.log(` ---> Create File\t${name} ---> success...`);
            resolve();
        });
    });
}

const setRouterTpl = function(tpl, moduleName) {
    tpl = tpl.replace(/\/\*<路由注入>\*\//g, `// ${moduleName}模块
import ${moduleName} from "./${moduleName}";
/*<路由注入>*/ `)
    tpl = tpl.replace(/\/\*<模块注入>\*\//g, `...${moduleName},
        /*<模块注入>*/`)
    return tpl;
}

const setStoreTpl = function(tpl, moduleName) {
    tpl = tpl.replace(/\/\*<状态注入>\*\//g, `import ${moduleName} from "./${moduleName}";
/*<状态注入>*/`)
    tpl = tpl.replace(/\/\*<模块注入>\*\//g, `/*<模块注入>*/
    ${moduleName},`)
    return tpl;
}
module.exports = async function(moduleName) {
    if(!moduleName) {
        console.log('need moduleName'.underline.red)
        return
    } 
    console.log(moduleName);
     // 构建${moduleName}目录，${moduleName}目录作为初始demo参考
     await createDir(moduleName, 'src/modules');
     // 初始化${moduleName}模型 
     await createFile(`${moduleName}.vue`, tpl['instancePage.js'].replace(/MODULENAME/g, moduleName), `src/modules/${moduleName}`);
     
     // 初始化标准路由结构(${moduleName}模块 案例)
     await createFile(`${moduleName}.js`, tpl['instanceRouter.js'].replace(/MODULENAME/g, moduleName), "src/router");
     await createFile("index.js", setRouterTpl(indexRouter, moduleName), "src/router");
 
     await createFile("index.js", setStoreTpl(moduleStore, moduleName), "src/store/modules");
     await createFile(`${moduleName}.js`, tpl['instanceStore.js'].replace(/MODULENAME/g, moduleName), "src/store/modules");
}