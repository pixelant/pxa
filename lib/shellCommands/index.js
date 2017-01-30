'use strict';

var fs = require('fs');

const shellCommands = module.exports = {};

// mkdir
shellCommands.mkdir = function mkdir(cache) {
    return new Promise(function(resolve) {
        fs.mkdirSync(cache.dirName);
        resolve(cache);
    });
};
