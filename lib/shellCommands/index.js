'use strict';

var fs = require('fs');
const Ora = require('ora');
const chalk = require('chalk');
const shell = require('shelljs');

const shellCommands = module.exports = {};
const spinner = new Ora();

// mkdir
shellCommands.mkdir = function mkdir(cache) {
    return new Promise(function(resolve) {
        fs.mkdirSync(cache.dirName);
        resolve(cache);
    });
};

shellCommands.ionicLogin = function ionicLogin(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Ionic login ...';
        spinner.start();
        let str = `ionic login -e ${cache.login} -p ${cache.password}`;
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                console.log('\n');
                spinner.fail('Ionic login error:');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please try to log in manually and then upload a mobile app to Ionic Cloud'));
                console.log(chalk.inverse('ionic login; ionic io init'));
                shell.exit(1);
            }
            if (stderr) {
                var match = stderr.match(/\n/i);
                if (stderr.slice(0, match.index) === 'Email or Password incorrect.') {
                    spinner.fail(chalk.red('Email or Password incorrect.'));
                    shell.exit(1);
                }
            }
            spinner.succeed('Logged in!');
            resolve(cache);
        });
    });
};

shellCommands.ionicInit = function ionicInit(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Initializing app with ionic.io';
        spinner.start();
        let str = 'ionic io init';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                spinner.fail('Ionic init error');
                console.log('\n');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please try to init app manually'));
                console.log(chalk.inverse('ionic io init'));
                shell.exit(1);
            }
            spinner.succeed('Successfully uploaded to ionic.io');
            resolve(cache);
        });
    });
};

shellCommands.ionicPush = function ionicPush(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Initializing app with ionic.io';
        spinner.start();
        let str = 'ionic io init';
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                spinner.fail('Ionic init error');
                console.log('\n');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please try to init app manually'));
                console.log(chalk.inverse('ionic io init'));
                shell.exit(1);
            }
            spinner.succeed('Successfully uploaded to ionic.io');
            resolve(cache);
        });
    });
};

