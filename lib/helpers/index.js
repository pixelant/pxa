'use strict';

const _ = require('lodash');
const chalk = require('chalk');

const helpers = module.exports = {};

helpers.addTo = function stats(cache, val) {
    if (val) {
        _.assign(cache, val);
    } else {
        console.log(Error('in helpers.addTo'));
    }
};

helpers.promiseChainStarter = function promiseChainStarter(val) {
    return new Promise(function(resolve) {
        resolve(val);
    });
};

helpers.error = function stats(fn, err) {
    console.log(chalk.red('Error!'));
    console.log(chalk.red('Parent function: ') + chalk.blue(fn) + '()' + '\n');
    console.log(chalk.red.underline('Error stack:'));
    console.log(err.stack);
    console.log(chalk.red('Parent function: ') + chalk.blue(fn) + '()');
};

helpers.random = function random() {
    return Math.floor((Math.random() * 1000000) + 1);
};


helpers.escapeRegExp = function escapeRegExp(string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
};
