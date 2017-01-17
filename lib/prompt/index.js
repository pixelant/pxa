'use strict';

const helpers = require('../helpers');
const inquirer = require('inquirer');

const prompt = module.exports = {};

prompt.ask = function ask(cache) {
    return new Promise(function(resolve, reject) {
        var questions = [
            {
                type: 'input',
                name: 'appName',
                message: 'App name:',
                default: function() {
                    return 'testApp';
                }
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author email:'
            },
            {
                type: 'input',
                name: 'mainLink',
                message: 'Main link to site. For example: http://pixelant.se',
                default: function() {
                    return 'http://pixelant.se';
                }
            },
        ];

        inquirer.prompt(questions)
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
