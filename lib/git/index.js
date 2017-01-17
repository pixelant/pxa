'use strict';

const shell = require('shelljs');
const variables = require('../variables');
const Ora = require('ora');

const git = module.exports = {};

git.clone = function clone(cache) {
    return new Promise(function(resolve) {
        const spinner = new Ora({
            text: 'Cloning repo ...',
        });
        spinner.start();
        let str = 'git clone --single-branch --depth 1 -b ' + variables.mobileApp.v + ' git@github.com:pixelant/golfstore_intranet_mobile_app.git .';
        let str1 = 'git checkout -b master; git remote remove origin';
        shell.exec(str, { silent:true }, function() {
            spinner.succeed();
            spinner.text = 'Set start point - MobileApp v' + variables.mobileApp.v;
            shell.exec(str1, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);

            });
        });
    });
};
