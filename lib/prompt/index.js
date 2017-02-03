'use strict';

const inquirer = require('inquirer');
const helpers = require('../helpers');
const chalk = require('chalk');
var fs = require('fs');

const prompt = module.exports = {};

// ask main mobile App questions
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
                    reject(Error('in prompt.mobileAppQuestions fn'));
                }
            });
        }
        recursivePrompt();
    });
};

// ask about logo and splashscreen for mobileApp
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

// ask about project type
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


// ask about project type
prompt.mobileAppStep = function mobileAppStep(cache) {
    return new Promise(function(resolve, reject) {
        let mobileAppStep = [
            {
                name: 'mobileAppStep',
                type: 'list',
                message: 'Project Type:',
                choices: [
                    {
                        name: 'Setup MobileApp Template',
                        value: 'cloneMobileAppTemplate'
                    },
                    {
                        name: 'Setup Ionic Cloud and Google FCM Sender ID',
                        value: 'ionicCloudSenderID'
                    }
                ],
            }
        ];
        inquirer.prompt(mobileAppStep)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.mobileAppStep fn'));
            }
        });
    });
};

// ask app name
prompt.appName = function appName(cache) {
    return new Promise(function(resolve, reject) {
        let appname = [
            {
                type: 'input',
                name: 'appName',
                message: 'App name: ' + chalk.dim('start with a capital letter'),
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

// ask folder name
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

// ask about install dependencies or not
prompt.installDep = function installDep(cache) {
    return new Promise(function(resolve, reject) {
        let installDep = [
            {
                type: 'confirm',
                name: 'installDep',
                message: 'Install dependencies? ' + chalk.dim('(it will take 2 - 7 min)'),
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




// Ionic login
// https://apps.ionic.io/signup
prompt.login = function login(cache) {
    return new Promise(function(resolve, reject) {
        let login = [
            {
                type: 'imput',
                name: 'login',
                message: 'Email:'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:'
            }
        ];
        inquirer.prompt(login)
        .then(function(answers) {
            if (answers) {
                helpers.addTo(cache, answers);
                resolve(cache);
            } else {
                reject(Error('in prompt.login fn'));
            }
        });
    });
};



// ask about sender ID
prompt.senderId = function senderId(cache) {
    return new Promise(function(resolve, reject) {
        var senderId = [
            {
                type: 'input',
                name: 'senderId',
                message: 'Google FCM Sender ID:'
            },
        ];
        function  recursivePrompt() {
            inquirer.prompt(senderId)
            .then(function(answers) {
                if (answers) {
                    helpers.addTo(cache, answers);
                    resolve(cache);
                } else {
                    reject(Error('in prompt.senderId fn'));
                }
            });
        }
        recursivePrompt();
    });
};
