'use strict';

let _         = require('lodash');
let chalk     = require('chalk');
let Benchmark = require('benchmark');

const PREFIX = '==============================';

exports.run = (name, registerFn) => {
  let suite = new Benchmark.Suite(name);

  registerFn(suite);

  suite
    .on('start', function() {
      console.log();
      console.log(chalk.blue(PREFIX), chalk.green(name), chalk.blue(PREFIX));
      if (suite.description) {
        console.log(suite.description);
      }
      console.log();
    })
    .on('complete', function() {
      let fastest = this.filter('fastest')[0];
      let names = _.map(this, bench => bench.name.length);
      let maxNameLen = _.max(names);

      _.chain(this)
        .orderBy('count', ['desc'])
        .each(bench => {
          let name = _.padEnd(bench.name, maxNameLen);
          let persent = _.round(bench.count / fastest.count * 100);
          let bar = _.repeat('=', persent);
          let slowerByTimes = _.round(fastest.count / bench.count, 2);
          let isFastest =  slowerByTimes === 1;
          let resultText = isFastest ? 'the best!' : `slower by ${slowerByTimes} times`;
          let color;
          if (persent < 75) {
             color =  'red';
          } else if (persent >= 75 && persent < 90) {
            color = 'yellow';
          } else {
            color = 'green';
          }
          console.log(chalk[color](name, `[${bar}] ${persent}%, ${resultText}`));
        })
        .value();
    })
    .run({ async: true });
};
