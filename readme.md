# What is faster
JS benchmarks

[![Build Status](https://travis-ci.org/AlexanderMac/what-is-faster.svg?branch=master)](https://travis-ci.org/AlexanderMac/what-is-faster)

![demo](https://raw.githubusercontent.com/AlexanderMac/what-is-faster/master/images/demo.png)

### Features
- Interactive commander for selecting benchmarks suite.
- Detailed, colored, friendly benchmarks result.
- Simple API for creating own benchmark suites.

### Usage
```sh
# Clone this repo:
git clone https://github.com/AlexanderMac/what-is-faster.git

# Install dependencies:
npm i

# Start app:
npm start
```

### Avaliable tests

### API

To create an own benchmarks suite, you need to create a script under `./lib/suites` folder with single `register` function.
This function should accept one parameter - `suite`, using `suite` object register needed tests:

```js
exports.register = (suite) => {
  suite
    .add('for(...)', () => {
      let res = 1;
      for (let i = 0; i < NUMBERS.length; i++) {
        res = res + res * NUMBERS[i];
      }
    })

    ...
```
No additional work is required. This function will be called automaticly when this test is selected in a commander.

### Author
Alexander Mac

### Licence
Licensed under the MIT license.
