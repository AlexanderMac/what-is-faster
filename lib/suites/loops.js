'use strict';

const _         = require('lodash');
const chalk     = require('chalk');
const Benchmark = require('benchmark');

const NUMBERS = _.times(10);

exports.run = () => {
  const suite = new Benchmark.Suite('loops');
  suite
    .add('for(...)', () => {
      let res = 1;
      for (let i = 0; i < NUMBERS.length; i++) {
        res = res + res * NUMBERS[i];
      }
    })
    .add('while(...)', () => {
      let i = 0;
      let res = 1;
      while (i < NUMBERS.length) {
        res = res + res * NUMBERS[i];
        i++;
      }
    })
    .add('do while(...)', () => {
      let i = 0;
      let res = 1;
      do {
        res = res + res * NUMBERS[i];
        i++;
      } while (i < NUMBERS.length);
    })
    .add('recursive fn(...)', () => {
      let res = 1;
      let fn = (i) => {
        if (i >= NUMBERS.length) {
            return;
        }
        res = res + res * NUMBERS[i];
        fn(i + 1);
      };
      fn(0);
    })
    .add('forEach(...)', () => {
      let res = 1;
      NUMBERS.forEach(num => {
        res = res + res * num;
      });
    })
    .add('lodash.each(...)', () => {
      let res = 1;
      _.each(NUMBERS, num => {
        res = res + res * num;
      });
    })
    .on('complete', function() {
      const fastest = this.filter('fastest')[0];
      const names = _.map(this, bench => bench.name.length);
      const maxNameLen = _.max(names);

      _.chain(this)
        .orderBy('count', ['desc'])
        .each(bench => {
          const name = _.padEnd(bench.name, maxNameLen);
          const persent = _.round(bench.count / fastest.count * 100);
          const bar = _.repeat('=', persent);
          const slowerByTimes = _.round(fastest.count / bench.count, 2);
          const isFastest =  slowerByTimes === 1;
          const resultText = isFastest ? 'the best!' : `slower by ${slowerByTimes} times`;
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
