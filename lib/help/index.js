'use strict';

const chalk = require('chalk');

const help = module.exports = {};

// generator help message
help.allHelp = function allHelp(cache) {
    var pkgV = require('../../package.json');
    let showHelp = `
    ${chalk.bold('pxa-generator')} v${pkgV.version}
    Automation tool

    ${chalk.bold.underline('Usage:')}
    pxa
    pxa [options]

    ${chalk.bold.underline('Options:')}
    -h, --help           Quick help.
    -v, --version        Print the pxa-generator version.
    -m, --mobile-app     Start mobile app based on inAppBrowser.
    -t, --theme          Create new Theme based on theme_t3kit

    `;
    console.log(showHelp);
    return cache;
};

// check pxa generator version from package.json
help.showVersion = function showVersion(cache) {
    var pkgV = require('../../package.json');
    let showVersion = `${pkgV.version}`;
    console.log(showVersion);
    return cache;
};

