'use strict';

const shell = require('shelljs');
const Ora = require('ora');
const chalk = require('chalk');

const dep = module.exports = {};
const spinner = new Ora();

// Instal npm dependencies
dep.npmInstall = function npmInstall(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Instaling npm dependencies ...';
            spinner.start();
            let str = 'npm install';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Add app icons
dep.addIonicResources = function addIonicResources(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Adding icons... ';
            spinner.start();
            let str = 'ionic resources ios; ionic resources android';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Add iOs and Android platforms
dep.addIonicPlatforms = function addIonicPlatforms(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Adding iOs and Android platforms ... ';
            spinner.start();
            let str = 'ionic platform add ios@latest; ionic platform add android@latest';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Build iOs and Android app
dep.ionicBuild = function ionicBuild(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Build iOs and Android app ... ';
            spinner.start();
            let str = 'ionic build ios; ionic build android';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);

    });
};

// reinstall phonegap-plugin-push
dep.ionicPush = function ionicPush(cache) {
    return new Promise(function(resolve) {
        spinner.text = 'Installing Google FCM Sender ID ...';
        spinner.start();
        let str = 'cordova plugin remove phonegap-plugin-push';
        let str1 = `cordova plugin add phonegap-plugin-push --variable SENDER_ID=${cache.senderId}`;
        shell.exec(str, { silent:true }, function(code, stdout, stderr) {
            if (code !== 0) {
                spinner.fail('Phonegap-plugin-push error');
                console.log('\n');
                console.log(chalk.red(stderr));
                console.log(chalk.yellow('Please try to reinstall phonegap-plugin-push manually'));
                console.log(chalk.inverse('cordova plugin remove phonegap-plugin-push; cordova plugin add phonegap-plugin-push --variable SENDER_ID=senderID'));
                shell.exit(1);
            }
            shell.exec(str1, { silent:true }, function(code, stdout, stderr) {
                if (code !== 0) {
                    spinner.fail('Phonegap-plugin-push error');
                    console.log('\n');
                    console.log(chalk.red(stderr));
                    console.log(chalk.yellow('Please try to install phonegap-plugin-push manually'));
                    console.log(chalk.inverse('cordova plugin add phonegap-plugin-push --variable SENDER_ID=senderID'));
                    shell.exit(1);
                }
                spinner.succeed();
                resolve(cache);
            });
        });
    });
};
