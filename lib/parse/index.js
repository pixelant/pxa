'use strict';

const shell = require('shelljs');
const helpers = require('../helpers');
const variables = require('../variables');

const parse = module.exports = {};

const Ora = require('ora');

parse.change = function change(cache) {
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
            variables.pxa.pwd + '/src/manifest.json',
            variables.pxa.pwd + '/src/index.html',
            variables.pxa.pwd + '/src/pages/start/start.ts',
            variables.pxa.pwd + '/src/app/app.module.ts'
        ];

        shell.sed('-i', '<%= appName %>', cache.appName, files);
        shell.sed('-i', '<%= appPackageId %>', helpers.random(), files);
        shell.sed('-i', '<%= authorEmail %>', cache.authorEmail, files);
        shell.sed('-i', '<%= mainLink %>', cache.mainLink, files);
        shell.sed('-i', '<%= senderId %>', cache.senderId || '1234567899', files);
        spinner.succeed();
        resolve(cache);
    });
};
