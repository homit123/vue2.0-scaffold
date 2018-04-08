#!/usr/bin/env node
var program = require('commander');
var colors = require('colors');
var scripts = require("./scripts");
console.log(scripts);
// 初始化项目
program
  .command('i [project]')
  .action(scripts.init);

// 初始化模块 +  路由 + 状态
program
  .command('add [muduleName]')
  .action(scripts.moduleScope);
program.parse(process.argv);