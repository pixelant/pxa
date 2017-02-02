#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const shell = require('shelljs');
const prompt = require('./lib/prompt');
const chalk = require('chalk');
const helpers = require('./lib/helpers');
const variables = require('./lib/variables');
const git = require('./lib/git');
const help = require('./lib/help');
const check = require('./lib/check');
const parse = require('./lib/parse');
const dep = require('./lib/dep');
const argv = require('minimist')(process.argv.slice(2));
const shellCommands = require('./lib/shellCommands');

var cache = {};

// Check is installed main dependencies
//====================================================
check.isInstalled();

// Clone MobileApp Template
//====================================================
function cloneMobileApp() {
    return helpers.promiseChainStarter(cache)
    .then(prompt.appName)
    .then(prompt.dirName)
    .then(prompt.mobileAppQuestions)
    .then(shellCommands.mkdir)
    .then(() => git.clone(cache, cache.dirName))
    .then(() => helpers.setWorkDir(cache, cache.dirName))
    .then(git.reinit)
    .then(parse.mobileAppFiles)
    .then(prompt.mobImages)
    .then(prompt.installDep)
    .then(dep.npmInstall)
    .then(dep.addIonicResources)
    .then(dep.addIonicPlatforms)
    .then(dep.ionicBuild)
    .then(git.add)
    .then(() => git.commit(cache, `initial commit, based on mobileAppTemplate v${variables.mobileAppTemplate.v}`))

    // .then((val) => { console.log(val); })
    // .then(() => { console.log(helpers.pwd()); })
    .catch((err) => { helpers.error('', err);});
}

// Register Ionic cloud and Google FCM Sender ID
//====================================================
function ionicCloudSenderID() {
    return helpers.promiseChainStarter(cache)
    .then(check.isIonic)
    .then(() => helpers.showMessage(cache, `To continue, please login to Pixelant Ionic account`))
    .then(prompt.login)
    .then(shellCommands.ionicLogin)
    .then(shellCommands.ionicInit)
    .then(parse.appId)
    .then(() => helpers.showMessage(cache, `Android FCM Project & Server Key \nhttp://docs.ionic.io/services/profiles/#android-fcm-project--server-key`))
    .then(prompt.senderId)
    .then(parse.appSenderId)
    .then(dep.ionicPush)
    .then(git.add)
    .then(() => git.commit(cache, 'setup Ionic Cloud and Google FCM Sender ID'))

    // .then((val) => { console.log(val); })
    // .then(() => { console.log(helpers.pwd()); })
    .catch((err) => { helpers.error('', err);});
}

function mobileAppSteps() {
    prompt.mobileAppStep(cache)
    .then(() => {
        if (cache.mobileAppStep === 'cloneMobileAppTemplate') {
            cloneMobileApp();
        } else {
            ionicCloudSenderID();
        }
    }).catch((err) => { helpers.error('', err);});
}

// main start point
//====================================================
function run() {
    prompt.projectType(cache)
    .then(() => {
        if (cache.projectType === 'mobileApp') {
            mobileAppSteps();
        } else if (cache.projectType === 'theme') {
            console.log(chalk.red('Not ready yet'));
            shell.exit(1);
        } else if (cache.projectType === 'help') {
            help.allHelp();
        }
    }).catch((err) => { helpers.error('run', err);});
}

// parse arguments
//====================================================
if (_.size(argv) !== 1 || argv._.length) {
    // pxa  -h, --help
    if (argv.h || argv.help) {
        help.allHelp();

    // pxa  -v, --version
    } else if (argv.v || argv.version) {
        help.showVersion();

    // pxa  -m, --mobile-app
    } else if (argv.m || argv['mobile-app']) {
        cache.projectType = 'mobile';
        mobileAppSteps();

    // pxa  -t, --theme
    } else if (argv.t || argv.theme) {
        cache.projectType = 'theme';
        console.log(chalk.red('Not ready yet'));
        shell.exit(1);

    } else {
        help.allHelp();
    }
} else {
    run();
}

// TODO: add checker if generator uses the last version of project templates
// TODO: show error message if something is wrong with dependencies installing
// TODO: helpers.error???
// TODO: add CI tests!!!
