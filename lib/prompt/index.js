'use strict';

const inquirer = require('inquirer');
const helpers = require('../helpers');
const chalk = require('chalk');
var fs = require('fs');

const prompt = module.exports = {};

prompt.mobileAppQuestions = function mobileAppQuestions(cache) {
    return new Promise(function(resolve, reject) {
        var mobileAppQuestions = [
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author email:',
                default: function() {
                    return 'test@test.com';
                }
            },
            {
                type: 'input',
                name: 'mainLink',
                message: 'Main link to site:',
                default: function() {
                    return 'http://demo.t3kit.com';
                }
            },
            {
                type: 'input',
                name: 'mainColor',
                message: 'Main color:',
                default: function() {
                    return '#50b4d8';
                }
            },
            // {
            //     type: 'input',
            //     name: 'senderId',
            //     message: 'Google FCM Sender ID: \n' + chalk.dim('If you don\'t know FCM Sender ID you can skip it and use a random one. Later on, you will be able to generate correct one'),
            //     default: function() {
            //         return '1234567899';
            //     }
            // },
            {
                type: 'confirm',
                name: 'isOk',
                message: 'Check the above information is it correct?',
                default: true,
            },
        ];
        function  recursivePrompt() {
            inquirer.prompt(mobileAppQuestions)
            .then(function(answers) {
                if (answers.isOk === false) {
                    recursivePrompt();
                } else if (answers.isOk === true) {
                    helpers.addTo(cache, answers);
                    resolve(cache);
                } else {
                    reject(Error('in prompt.ask fn'));
                }
            });
        }
        recursivePrompt();
    });
};

prompt.mobImages = function mobImages(cache) {
    return new Promise(function(resolve, reject) {
        let mobImages = [
            {
                type: 'confirm',
                name: 'mobImages',
                message: 'Ionic requires some images (logo and splashscreen) to indentify your app. \n' + chalk.yellow('Before continuing') + ', you need to put two images ' + chalk.cyan('splash.png (2208x2208px)') + ' and ' + chalk.cyan('icon.png (192x192px)') + ' into ' + chalk.cyan(cache.dirName + '/resources') + ' folder.',
                default: true,
            }
        ];
        inquirer.prompt(mobImages)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.mobImages fn'));
            }
        });
    });
};

prompt.projectType = function projectType(cache) {
    return new Promise(function(resolve, reject) {
        let projectType = [
            {
                name: 'projectType',
                type: 'list',
                message: 'Project Type:',
                choices: [
                    {
                        name: 'Mobile App',
                        value: 'mobileApp'
                    },
                    {
                        name: 'Theme template',
                        value: 'theme'
                    },
                    {
                        name: 'Help',
                        value: 'help'
                    }
                ],
            }
        ];
        inquirer.prompt(projectType)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.projectType fn'));
            }
        });
    });
};

prompt.appName = function appName(cache) {
    return new Promise(function(resolve, reject) {
        let appname = [
            {
                type: 'input',
                name: 'appName',
                message: 'App name:',
                default: function() {
                    return 't3kit';
                }
            }
        ];
        inquirer.prompt(appname)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.appName fn'));
            }
        });
    });
};

prompt.dirName = function dirName(cache) {
    return new Promise(function(resolve, reject) {
        let dirName = [
            {
                type: 'imput',
                name: 'dirName',
                message: 'Create a new folder with name:',
                default: function() {
                    return cache.appName;
                },
                validate: function(value) {
                    if (!fs.existsSync(value)) {
                        return true;
                    }
                    return chalk.red('Folder exists. Please choose another folder name.');
                }
            }
        ];
        inquirer.prompt(dirName)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.dirName fn'));
            }
        });
    });
};

prompt.installDep = function installDep(cache) {
    return new Promise(function(resolve, reject) {
        let installDep = [
            {
                type: 'confirm',
                name: 'installDep',
                message: 'Install dependencies?',
                default: true,
            }
        ];
        inquirer.prompt(installDep)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.installDep fn'));
            }
        });
    });
};
