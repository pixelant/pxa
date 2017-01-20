'use strict';

const inquirer = require('inquirer');
const helpers = require('../helpers');

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
                name: 'appName',
                message: 'App name:',
                default: function() {
                    return 't3kit';
                }
            },
            {
                type: 'input',
                name: 'mainLink',
                message: 'Main link to site:',
                default: function() {
                    return 'http://www.t3kit.com';
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
                name: 'images',
                message: 'Ionic requires some images (logo and splashscreen) to indentify your app. You need to put two images splash.png and icon.png into yourApp/resources folder.',
                default: true,
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
                    reject(Error('in prompt.ask fn'));
                }
            });
        }
        recursivePrompt();
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
                reject(Error('in prompt.ask fn'));
            }
        });
    });
};
