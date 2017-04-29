'use strict';

let _        = require('lodash');
let inquirer = require('inquirer');
let suites   = require('./suites');
let runner   = require('./runner'); 

exports.run = () => {
  let mapLevelItems = (items) => {
    return _.chain(items)
      .map((data, name) => {
        let isSuite = !!data.register;
        return {
          name,
          displayName: isSuite ? name : `[${name}]`,
          data: data,
          isSuite
        };
      })
      .sortBy(['isSuite', 'name'])
      .value();
  };

  let promtNextLevel = (items) => {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select suites [category] or single suite for running',
          choices: _.map(items, 'displayName')
        }
      ])
      .then(result => {
        let selItem = _.find(items, { displayName: result.choice });
        if (selItem.isSuite) {
          return selItem;
        }

        items = mapLevelItems(selItem.data);
        return promtNextLevel(items);
      });
  };

  let items = mapLevelItems(suites);
  promtNextLevel(items)
    .then(suite => {
      let registerFn = _.get(suite, 'data.register');
      if (!_.isFunction(registerFn)) {
        throw new Error('The suite file doesn\'t contain `register` function');
      }

      runner.run(suite.name, registerFn);
    })
    .catch(err => {
      // todo
      console.error(err);
    });
};
