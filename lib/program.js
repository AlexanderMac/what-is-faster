'use strict';

const _        = require('lodash');
const inquirer = require('inquirer');
const suites   = require('./suites');

exports.run = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'suites',
        message: 'What benchmarks suite do you want to run?',
        choices: _.keys(suites)
      }
    ])
    .then(result => {
      const suiteName = result.suites;
      suites[suiteName].run();
    })
    .catch(err => {
      // TODO: handle this
      console.error(err);
    });
};
