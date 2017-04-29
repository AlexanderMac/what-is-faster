'use strict';

let _ = require('lodash');

exports.register = (suite) => {
  const NUMBERS = _.times(10);

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
    });
};
