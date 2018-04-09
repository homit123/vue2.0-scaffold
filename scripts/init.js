const fs = require("fs"),
      path = require("path"),
      tpl = require("../template/tpl.js"),
      colors = require('colors'),
      pwd = process.cwd();

var project_name = "vue-scaffod";
const createDir = function(name, parent = '') {
    return new Promise((resolve, reject) => {
        let dir = project_name == '.'?`./${parent}`:`./${project_name}/${parent}`
        fs.mkdir(path.join(pwd, dir, name), (err) => {
            if (err && err.code !== 'EEXIST')
                throw err;
            console.log(` ---> Create Directory\t${name} ---> success...`);
            resolve();
        });
    });
}

const createFile = function(name, fileCtx, parent = '') {
    let dir = project_name == '.'?`./${parent}`:`./${project_name}/${parent}`
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(pwd, dir, name), fileCtx, (err) => {
            if (err && err.code !== 'EEXIST')
                throw err;
            console.log(` ---> Create File\t${name} ---> success...`);
            resolve();
        });
    });
}
async function init_dir() {
    if(project_name != '.') {
          // 构建${project_name}
          await new Promise((resolve, reject) => {
            fs.mkdir(path.join(pwd, project_name), (err) => {
                if (err && err.code !== 'EEXIST')
                    throw err;
                console.log(` ---> Create project\t${project_name}\t\t\tsuccess...`);
                resolve();
            });
        });
    }
    // 构建src
    await createDir('src'); 
    // 构建build
    await createDir('build');
    // 构建src结构目录
    let  src_sub_files = [
        'components',
        'config',
        'event',
        'fetch',
        'filters',
        'directives',
        'frame',
        'mixins',
        'modules',
        'portal',
        'router',
        'static',
        'store',
        'theme',
        'theme_src',
        'utils',
        'vendor'
    ];
    for(let i = 0; i < src_sub_files.length; i++) {
        await createDir(src_sub_files[i], 'src');
    }
    // 构建home目录，home目录作为初始demo参考
    await createDir('home', 'src/modules');
    // 构建vuex的结构目录
    await createDir('modules', 'src/store');
     // 构建theme下主题文件
    await createDir('custom-red', 'src/theme');
    await createDir('custom-blue', 'src/theme');

     // 构建theme_src下主题文件
    await createDir('custom-red', 'src/theme_src');
    await createDir('custom-blue', 'src/theme_src');
}

async function init_file() {
    let name = project_name;
    if(name == ".") name = "vue-scaffod";

    // 初始化package.json
    await createFile("package.json", tpl['package.json'].replace(/PROJECTNAME/g, name));

    // 初始化server.js  初始babel配置文件
    await createFile("server.js", tpl['server.js']);
    await createFile(".babelrc", tpl['babelRc.js']);
    // 初始化build下的webpack文件
    await createFile("webpack.base.conf.js", tpl['webpack.base.conf.js'], "build");
    await createFile("webpack.conf.js", tpl['webpack.conf.js'], "build");
    await createFile("webpack.dll.conf.js", tpl['webpack.dll.conf.js'], "build");

    // 初始化 src下app.js   app.scss, App.vue. entry-client.js  index.template.html
    await createFile("app.js", tpl['app.js'], "src");
    await createFile("app.scss", tpl['app.scss'], "src");
    await createFile("app.vue", tpl['appVue.js'], "src");
    await createFile("entry-client.js", tpl['entry-client.js'], "src");
    await createFile("index.template.html", tpl['index.template.html'], "src");
    
    // 初始化配置文件
    await createFile("config.js", tpl['config.js'], "src/config");

    // 初始化事件总线模型
    await createFile("moduleEvent.vue", tpl['moduleEvent.js'], "src/event");

    // 初始化fetch
    await createFile("index.js", tpl['fetch.js'], "src/fetch");

    // 初始化常用指令/过滤器
    await createFile("index.js", tpl['filters.js'], "src/filters");

    // 初始化home模型 
    await createFile("index.vue", tpl['instancePage.js'].replace(/MODULENAME/g, "home"), "src/modules/home");
    // 初始化modules常规页面
    await createFile("fof.vue", tpl['fof.js'], "src/modules");
    await createFile("mainView.vue", tpl['mainView.js'], "src/modules");
    await createFile("moduleView.vue", tpl['moduleView.js'], "src/modules");
    await createFile("transferView.vue", tpl['transferView.js'], "src/modules");

    // 初始化 mixins 模型

    // 初始化home 页面 基于home布局

    // 初始化home布局的portal模型
    
    // 初始化标准路由结构(home模块 案例)
    await createFile("home.js", tpl['instanceRouter.js'].replace(/MODULENAME/g, "home"), "src/router");
    await createFile("index.js", tpl['indexRouter.js'], "src/router");

    // 初始化 utils常用工具方法
    await createFile("lodash.js", tpl['lodash.js'], "src/utils");
    // 初始化store模型 (home模块 案例)
    await createFile("index.js", tpl['indexStore.js'], "src/store");
    await createFile("utils.js", tpl['utilStore.js'], "src/store");
    await createFile("index.js", tpl['moduleStore.js'], "src/store/modules");
    await createFile("home.js", tpl['instanceStore.js'].replace(/MODULENAME/g, "home"), "src/store/modules");
    // 初始化主题文件
    await createFile("index.css", tpl['themeBlue.js'], "src/theme/custom-blue");
    await createFile("index.css", tpl['themeRed.js'], "src/theme/custom-red");
    // 初始化主题文件原始样式
    await createFile("index.css", tpl['themeSrcBlue.js'], "src/theme_src/custom-blue");
    await createFile("index.css", tpl['themeSrcRed.js'], "src/theme_src/custom-red");
    // 初始化主题源码目录packagejson 动态scss readme
    await createFile("element-variables.scss", tpl['themeSrcvar.js'], "src/theme_src");
    await createFile("package.json", tpl['themeSrcPackage.js'], "src/theme_src");
    await createFile("readMe.md", tpl['themeSrcReadme.js'], "src/theme_src");
    // 初始化gulp文件
     await createFile("gulpfile.js", tpl['gulpfile.js'], "./");
}
module.exports = async function(project) {
    if(project) project_name = project;
    await init_dir();
    await init_file();
}