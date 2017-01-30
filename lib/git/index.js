'use strict';

const shell = require('shelljs');
const variables = require('../variables');
const helpers = require('../helpers');
const Ora = require('ora');
const chalk = require('chalk');
var fs = require('fs');
// var process = require('process');


const git = module.exports = {};
const spinner = new Ora();

git.clone = function clone(cache) {
    return new Promise(function(resolve) {
        // const spinner = new Ora({
        //     // text: 'Cloning repo ...',
        //     text: 'Cloning Mobile App template ...',
        // });
        spinner.text = 'Cloning Mobile App template ...';
        spinner.start();
        // let str = 'git clone --single-branch --depth 1 -b ' + variables.mobileApp.v + ' git@github.com:pixelant/mobileApp_template.git .';
        let str = 'git clone --single-branch --depth 1 git@github.com:pixelant/mobileApp_template.git ' + cache.dirName;
        let str1 = 'git checkout -b master; git remote remove origin';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                console.log('\n');
                console.log(chalk.red('Git clone error:'));
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please fix problem and try again'));
                shell.exit(1);
            }
            process.chdir(cache.dirName);
            // spinner.succeed();
            // spinner.text = 'Set start point - MobileApp v' + variables.mobileApp.v;
            // spinner.text = 'Set start point - MobileApp v' + variables.mobileApp.v;
            // spinner.text = 'Cloning Mobile App template ...';
            shell.exec(str1, { silent:true }, function(code, stdout, stderr) {
                spinner.succeed();
                if (code !== 0) {
                    console.log('\n');
                    console.log(chalk.red('Git checkout error:'));
                    console.log(chalk.red(stderr));
                    console.log(chalk.yellow('Please fix problem and try again'));
                    shell.exit(1);
                }
                // process.chdir(cache.dirName);
                resolve(cache);
            });
        });
    });
};


git.commit = function commit(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Initial commit ...';
        spinner.start();
        let str = 'git commit -a -m "initial commit"';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            spinner.succeed();
            if (code !== 0) {
                console.log('\n');
                console.log(chalk.red('Git commit error:'));
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please fix problem and try again, or you can commit all uncommitted files manually.'));
                shell.exit(1);
            }
            resolve(cache);
        });
    });
};
