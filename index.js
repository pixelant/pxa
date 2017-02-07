#!/usr/bin/env node

'use strict';

const _ = require('lodash');
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
const cmd = require('./lib/cmd');
const ionic = require('./lib/ionic');

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
    .then(cmd.mkdir)
    .then(() => git.clone(cache, `git@github.com:pixelant/mobileApp_template.git`))
    .then(() => cmd.setWorkDir(cache, cache.dirName))
    .then(git.remove)
    .then(git.init)
    .then(git.add)
    .then(() => git.commit(cache, `initial commit, based on mobileAppTemplate v${variables.mobileAppTemplate.v}`))
    .then(parse.mobileAppFiles)
    .then(git.add)
    .then(() => git.commit(cache, `identify the new application (app name, main color, app link)`))
    .then(prompt.mobImages)
    .then(prompt.installDep)
    .then(() => cache.installDep ? dep.npmInstall() : cache)
    .then(() => cache.installDep ? ionic.addResources() : cache)
    .then(() => cache.installDep ? ionic.addPlatforms() : cache)
    .then(() => cache.installDep ? ionic.build() : cache)
    .then(() => cache.installDep ? git.add() : cache)
    .then(() => cache.installDep ? git.commit(cache, 'add Ionic image resources') : cache)

    // .then((val) => { console.log(val); })
    .catch(helpers.error);
}

// Register Ionic cloud and Google FCM Sender ID
//====================================================
function ionicCloudSenderID() {
    return helpers.promiseChainStarter(cache)
    .then(check.isIonic)
    .then(() => cmd.showMessage(cache, `To continue, please login to Pixelant Ionic account`))
    .then(prompt.login)
    .then(ionic.login)
    .then(ionic.init)
    .then(parse.mobileAppId)
    .then(() => cmd.showMessage(cache, `Android FCM Project & Server Key \nhttp://docs.ionic.io/services/profiles/#android-fcm-project--server-key`))
    .then(prompt.senderId)
    .then(parse.appSenderId)
    .then(ionic.removePushPlugin)
    .then(ionic.installSenderId)
    .then(ionic.build)
    .then(git.add)
    .then(() => git.commit(cache, 'setup Ionic Cloud and Google FCM Sender ID'))

    // .then((val) => { console.log(val); })
    .catch(helpers.error);
}

function mobileAppSteps() {
    prompt.mobileAppStep(cache)
    .then(() => {
        if (cache.mobileAppStep === 'cloneMobileAppTemplate') {
            cloneMobileApp();
        } else {
            ionicCloudSenderID();
        }
    })
    .catch(helpers.error);
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
            process.exit(1);
        } else if (cache.projectType === 'help') {
            help.allHelp();
        }
    })
    .catch(helpers.error);
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
        process.exit(1);

    } else {
        help.allHelp();
    }
} else {
    run();
}

// TODO: add checker if generator uses the last version of project templates
// TODO: add CI tests!!!
// TODO: test internet connection
// TODO: optimize, remove lodash
