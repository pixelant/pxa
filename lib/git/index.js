'use strict';

const shell = require('shelljs');
const variables = require('../variables');
const Ora = require('ora');
const chalk = require('chalk');

const git = module.exports = {};
const spinner = new Ora();

// clone mobileApp_template
git.clone = function clone(cache, cloneDir) {
    return new Promise(function(resolve) {
        spinner.text = 'Cloning Mobile App template';
        spinner.start();
        let str = 'git clone --single-branch --depth 1 -b ' + variables.mobileAppTemplate.v + ' git@github.com:pixelant/mobileApp_template.git ' + cloneDir;
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                spinner.fail('Git clone error:');
                console.log('\n');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please fix problem and try again'));
                shell.exit(1);
            }
            spinner.succeed();
            resolve(cache);
        });
    });
};

// remove old repo and create new one
git.reinit = function reinit(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Initializing new repository';
        spinner.start();
        let str = 'rm -rf .git';
        let str1 = 'git init';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                spinner.fail('Remove old git repo error:');
                console.log('\n');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please fix problem and try again'));
                shell.exit(1);
            }
            shell.exec(str1, { silent:true }, function(code, stdout, stderr) {
                if (code !== 0) {
                    spinner.fail('Git init error:');
                    console.log('\n');
                    console.log(chalk.red(stderr));
                    console.log(chalk.yellow('Please fix problem and try again'));
                    shell.exit(1);
                }
                spinner.succeed();
                resolve(cache);
            });
        });
    });
};

// git add
git.add = function add(cache) {
    return new Promise(function(resolve) {
        let str = 'git add .';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                console.log('\n');
                console.log(chalk.red('Git add error:'));
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please fix problem and try again, or you can add all untracked files manually.'));
                shell.exit(1);
            }
            resolve(cache);
        });
    });
};

// git commit
git.commit = function commit(cache, commitMessage) {
    return new Promise(function(resolve) {
        let str = `git commit -m "${commitMessage}"`;
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
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
