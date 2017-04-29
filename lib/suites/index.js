'use strict';

let chalk      = require('chalk');
let Benchmark  = require('benchmark');
let requireDir = require('require-dir');

Benchmark.options.onStart = function() {
  console.log(chalk.blue('started:'), chalk.green(this.name));
};

Benchmark.options.onComplete = function() {
  let bench = this;
  let hz = bench.hz;
  let stats = bench.stats;
  let size = stats.sample.length;
  let pm = '\xb1';
  let result =
        _formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size === 1 ? '' : 's') + ' sampled)';

  console.log(chalk.blue('finished:'), chalk.green(result));
  console.log();
};

let _formatNumber = (number) => {
  number = String(number).split('.');
  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
};

module.exports = requireDir('./', { recurse: true });
