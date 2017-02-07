'use strict';

const shell = require('shelljs');
const helpers = require('../helpers');
const variables = require('../variables');

const parse = module.exports = {};

// replace template strings in mobile App files
parse.mobileAppFiles = function mobileAppFiles(cache) {
    return new Promise(function(resolve) {
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
        shell.sed('-i', '<%= mainColor %>', cache.mainColor, files);
        shell.sed('-i', '<%= mobileAppTemplateVersion %>', variables.mobileAppTemplate.v, files);
        shell.sed('-i', helpers.escapeRegExp('## Mobile App starter template for [pxa cli](https://github.com/pixelant/pxa)'), '', files);
        resolve(cache);
    });
};

// replace SenderId template strings in mobile App files
parse.appSenderId = function appSenderId(cache) {
    return new Promise(function(resolve) {
        let files = [
            'config.xml',
            'package.json',
            helpers.pwd() + '/src/app/app.module.ts'
        ];
        shell.sed('-i', '123456789999', cache.senderId, files);
        resolve(cache);
    });
};

// replace appID template strings in mobile App files
parse.mobileAppId = function mobileAppId(cache) {
    return new Promise(function(resolve) {
        let ionic = require(`${process.cwd()}/ionic.config.json`);
        let files = [
            helpers.pwd() + '/src/app/app.module.ts'
        ];

        shell.sed('-i', '<%= appId %>', ionic.app_id, files);
        resolve(cache);
    });
};
