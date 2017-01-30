'use strict';

const shell = require('shelljs');
const helpers = require('../helpers');

const parse = module.exports = {};

const Ora = require('ora');

parse.mobileAppFiles = function mobileAppFiles(cache) {
    return new Promise(function(resolve) {
        const spinner = new Ora({
            text: 'Changing files ...',
        });
        spinner.start();
        let files = [
            'package.json',
            'config.xml',
            'README.md',
            'ionic.config.json',
            helpers.pwd() + '/src/index.html',
            helpers.pwd() + '/src/theme/variables.scss',
            helpers.pwd() + '/src/pages/start/start.ts',
            helpers.pwd() + '/src/app/app.module.ts'
        ];

        shell.sed('-i', '<%= appName %>', cache.appName, files);
        shell.sed('-i', '<%= appPackageId %>', helpers.random(), files);
        shell.sed('-i', '<%= authorEmail %>', cache.authorEmail, files);
        shell.sed('-i', '<%= mainLink %>', cache.mainLink, files);
        // shell.sed('-i', '<%= senderId %>', cache.senderId, files);
        shell.sed('-i', '<%= mainColor %>', cache.mainColor, files);
        shell.sed('-i', helpers.escapeRegExp('## Mobile App template for **pxa** generator'), '', files);
        spinner.succeed();
        resolve(cache);
    });
};
