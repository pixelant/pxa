'use strict';

const helpers = require('../helpers');

const dep = module.exports = {};

// Instal npm dependencies
dep.npmInstall = function npmInstall(cache) {
    let cmd = {
        spinner: 'Instaling npm dependencies',
        str: 'npm install'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Add app icons
dep.addIonicResources = function addIonicResources(cache) {
    let cmd = {
        spinner: 'Adding icons',
        str: 'ionic resources ios; ionic resources android'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Add iOs and Android platforms
dep.addIonicPlatforms = function addIonicPlatforms(cache) {
    let cmd = {
        spinner: 'Adding iOs and Android platforms',
        str: 'ionic platform add ios@latest; ionic platform add android@latest'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Build iOs and Android app
dep.ionicBuild = function ionicBuild(cache) {
    let cmd = {
        spinner: 'Build iOs and Android app',
        str: 'ionic build ios; ionic build android'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Clear out the platforms and plugins directories, and reinstall plugins and platforms [ionic state reset]
dep.ionicStateReset = function ionicStateReset(cache) {
    let cmd = {
        // spinner: 'Clear out and reinstall plugins and platforms',
        str: 'ionic state reset'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Reinstalling phonegap-plugin-push
dep.removePushPlugin = function removePushPlugin(cache) {
    let cmd = {
        spinner: 'Reinstalling phonegap-plugin-push',
        str: 'cordova plugin remove phonegap-plugin-push'
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

// Installing Google FCM Sender ID
dep.installSenderId = function installSenderId(cache) {
    let cmd = {
        spinner: 'Installing Google FCM Sender ID',
        str: `cordova plugin add phonegap-plugin-push --variable SENDER_ID=${cache.senderId}`
        // spinerSucceed: ''
    };
    return helpers.execCMD(cmd, cache);
};

