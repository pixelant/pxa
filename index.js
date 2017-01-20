#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const shell = require('shelljs');
const prompt = require('./lib/prompt');
const chalk = require('chalk');
const helpers = require('./lib/helpers');
const git = require('./lib/git');
const help = require('./lib/help');
const check = require('./lib/check');
const parse = require('./lib/parse');
const dep = require('./lib/dep');
const argv = require('minimist')(process.argv.slice(2));

var cache = {};

// Check is installed main dependencies
//====================================================
check.isInstalled();

// run mobileApp
//====================================================
function mobileApp() {
    return helpers.promiseChainStarter(cache)
    .then(prompt.mobileAppQuestions)
    .then(git.clone)

    .then(parse.change)
    .then(dep.npmInstall)
    .then(dep.addIonicResources)
    .then(dep.addIonicPlatforms)
    .then(dep.ionicBuild)

    .then((val) => { console.log(val); })
    .then(() => { console.log('yes'); })
    .catch((err) => { helpers.error('', err);});
}

// main start point
//====================================================
function run() {
    prompt.projectType(cache)
    .then(() => {
        if (cache.projectType === 'mobileApp') {
            mobileApp();
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
        mobileApp();

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
