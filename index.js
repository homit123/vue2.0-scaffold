#!/usr/bin/env node
var program = require('commander');
var colors = require('colors');
var scripts = require("./scripts");
program
  .command('i [project]')
  .action(scripts.init);

program.parse(process.argv);