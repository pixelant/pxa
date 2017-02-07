'use strict';

const Ora = require('ora');
const chalk = require('chalk');
const helpers = require('../helpers');
const exec = require('child_process').exec;

const ionic = module.exports = {};
const spinner = new Ora();

// IONIC commands
// ======================================================================

// login to ionic cloud
ionic.login = function login(cache) {
    return new Promise(function(resolve, reject) {
        spinner.text = 'Ionic login ...';
        spinner.start();
        let str = `ionic login -e ${cache.login} -p ${cache.password}`;
        exec(str, (error, stdout, stderr) => {
            if (error) {
                spinner.fail(`[ionic login] -> error`);
                console.log(chalk.yellow('Please try to log in manually and then upload a mobile app to Ionic Cloud'));
                reject(new Error(error));
            } else if (stderr) {
                let match = stderr.match(/\n/i);
                let stderrStr = stderr.slice(0, match.index);
                let str = 'Email or Password incorrect.';
                if (stderrStr === str) {
                    spinner.fail(chalk.red(str));
                    console.log(chalk.yellow('Check your email/pass and try again.'));
                    process.exit(1);
                } else {
                    spinner.fail(chalk.red(stderrStr));
                    reject(new Error(error));
                }
            } else {
                spinner.succeed('Logged in!');
                resolve(cache);
            }
        });
    });
};

// Build iOs and Android app
ionic.build = function build(cache) {
    let cmd = {
        spinner: 'Building iOs and Android app',
        str: 'ionic build ios; ionic build android'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Initialize mobileApp
ionic.init = function init(cache) {
    let cmd = {
        spinner: `Initializing app with ionic.io`,
        str: `ionic io init`,
        spinerSucceed: `Successfully uploaded to ionic.io`
    };
    return helpers.execCMD(cmd, cache);
};

// Add app icons
ionic.addResources = function addResources(cache) {
    let cmd = {
        spinner: 'Adding icons',
        str: 'ionic resources ios; ionic resources android'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Add iOs and Android platforms
ionic.addPlatforms = function addPlatforms(cache) {
    let cmd = {
        spinner: 'Adding iOs and Android platforms',
        str: 'ionic platform add ios@latest; ionic platform add android@latest'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Reinstalling phonegap-plugin-push
ionic.removePushPlugin = function removePushPlugin(cache) {
    let cmd = {
        spinner: 'Reinstalling phonegap-plugin-push',
        str: 'cordova plugin remove phonegap-plugin-push'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Installing Google FCM Sender ID
ionic.installSenderId = function installSenderId(cache) {
    let cmd = {
        spinner: 'Installing Google FCM Sender ID',
        str: `cordova plugin add phonegap-plugin-push --variable SENDER_ID=${cache.senderId}`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};
