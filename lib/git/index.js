'use strict';

const variables = require('../variables');
const helpers = require('../helpers');

const git = module.exports = {};

// clone mobileApp_template
git.clone = function clone(cache, link) {
    let cmd = {
        spinner: `Cloning ${cache.projectType} template`,
        str: `git clone --single-branch --depth 1 -b ${variables.mobileAppTemplate.v} ${link} ${cache.dirName}`,
        spinerSucceed: `${cache.projectType} template successfully cloned`
    };
    return helpers.execCMD(cmd, cache);
};

// remove previous git repo
git.remove = function remove(cache) {
    let cmd = {
        // spinner: '',
        str: `rm -rf .git`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};
// git add
git.init = function init(cache) {
    let cmd = {
        // spinner: '',
        str: `git init`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// git add
git.add = function add(cache) {
    let cmd = {
        // spinner: '',
        str: `git add .`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// git commit
git.commit = function commit(cache, commitMessage) {
    let cmd = {
        // spinner: '',
        str: `git commit -m "${commitMessage}"`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};
