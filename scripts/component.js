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
            console.log(` ---> Create Directory\t${name} ---> success...`.green);
            resolve();
        });
    });
}

const createFile = function (name, fileCtx, dir) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(pwd, dir, name), fileCtx, (err) => {
            if (err && err.code !== 'EEXIST') 
                throw err;
            console.log(` ---> Create File\t${name} ---> success...`.green);
            resolve();
        });
    });
}
const compsFun = {
    async table() {
        // 构建目录
        await createDir('table', 'src/components');
        // 创建grid 基类
        await createFile("grid.js", tpl['grid.js'], "src/components");
        // 创建table.js 基类
        await createFile("table.js", tpl['table.js'], "src/components/table");
        // 创建table.vue
        await createFile("table.vue", tpl['tableVue.js'], "src/components/table");
        // 创建readme
        await createFile("readme.md", tpl['tableReadMe.js'], "src/components/table");
    },
    async list() {
        // 构建目录
        await createDir('list', 'src/components');
        // 创建 list.js 基类
        await createFile("list.js", tpl['list.js'], "src/components/list");
        // 创建list.vue
        await createFile("list.vue", tpl['listVue.js'], "src/components/list");
    },
    async search() {
        // 构建目录
        await createDir('search', 'src/components');
        // search.vue
        await createFile("search.vue", tpl['searchVue.js'], "src/components/search");
        await createFile("searchSprite.vue", tpl['searchSpriteVue.js'], "src/components/search");
    },

    async panel() {
        // 构建目录
        await createDir('panel', 'src/components');
        // panel.vue
        await createFile("panel.vue", tpl['panelVue.js'], "src/components/panel");
        await createFile("panel.css", tpl['panelCss.js'], "src/components/panel");
    }
}
const comps = ['table', 'list', 'search', 'panel'];
module.exports = async function (componentName) {
    if(!componentName) {
        console.log('must componentName'.red);
        return
    }
    if(comps.indexOf(componentName) == -1) {
        console.log(`no ${componentName} component`.red);
        return
    }

    compsFun[componentName]()
}