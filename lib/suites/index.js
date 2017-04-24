'use strict';

const chalk      = require('chalk');
const Benchmark  = require('benchmark');
const requireDir = require('require-dir');

Benchmark.options.onStart = function() {
  console.log(chalk.blue('started:'), chalk.green(this.name));
};

Benchmark.options.onComplete = function() {
  const bench = this;
  const hz = bench.hz;
  const stats = bench.stats;
  const size = stats.sample.length;
  const pm = '\xb1';
  const result =
        _formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size === 1 ? '' : 's') + ' sampled)';

  console.log(chalk.blue('finished:'), chalk.green(result));
  console.log('');
};

const _formatNumber = (number) => {
  number = String(number).split('.');
  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
};

module.exports = requireDir('./', { recurse: true });
