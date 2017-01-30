'use strict';

const shell = require('shelljs');
const Ora = require('ora');

const dep = module.exports = {};
const spinner = new Ora();

// Instal npm dependencies
dep.npmInstall = function npmInstall(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Instaling npm dependencies ...';
            spinner.start();
            let str = 'npm install';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Add app icons
dep.addIonicResources = function addIonicResources(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Adding icons... ';
            spinner.start();
            let str = 'ionic resources ios; ionic resources android';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Add iOs and Android platforms
dep.addIonicPlatforms = function addIonicPlatforms(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Adding iOs and Android platforms ... ';
            spinner.start();
            let str = 'ionic platform add ios@latest; ionic platform add android@latest';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);
    });
};

// Build iOs and Android app
dep.ionicBuild = function ionicBuild(cache) {
    return new Promise(function(resolve) {
        function run() {
            spinner.text = 'Build iOs and Android app ... ';
            spinner.start();
            let str = 'ionic build ios; ionic build android';
            shell.exec(str, { silent:true }, function() {
                spinner.succeed();
                resolve(cache);
            });
        }
        cache.installDep ? run() : resolve(cache);

    });
};

