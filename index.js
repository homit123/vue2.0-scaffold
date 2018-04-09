#!/usr/bin/env node
var program = require('commander');
var colors = require('colors');
var scripts = require("./scripts");
// 初始化项目
program
  .command('i [project]')
  .action(scripts.init);

// 初始化模块 +  路由 + 状态
program
  .command('add [muduleName]')
  .action(scripts.moduleScope);

// 功能组件
program
  .command('use [componentName]')
  .action(scripts.componentScope);

program.parse(process.argv);