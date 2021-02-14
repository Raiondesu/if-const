# if-const [![NPM version](https://img.shields.io/npm/v/if-const.svg?style=flat-square)](https://www.npmjs.com/package/if-const) [![NPM monthly downloads](https://img.shields.io/npm/dm/if-const.svg?style=flat-square)](https://npmjs.org/package/if-const) [![NPM total downloads](https://img.shields.io/npm/dt/if-const.svg?style=flat-square)](https://npmjs.org/package/if-const) [![Linux Build Status](https://img.shields.io/travis/raiondesu/if-const.svg?style=flat-square)](https://travis-ci.com/raiondesu/if-const) [![Linux Build Status](https://img.shields.io/coveralls/github/Raiondesu/if-const?style=flat-square)](https://travis-ci.com/raiondesu/if-const)

> Executes blocks of code depending on thruthness of the value, while also making the value accessible to the block

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save if-const
```

or in any other way you like.

## Usage

Works with any type of conditional that a normal `if` works with.\
Allows to use the result of a conditional in a code block (similar to C# `out var` syntax).

```ts
import ifConst from 'if-const';

// a little function to simulate uncertanty of the result
// it returns either null or an object
const nullOrObj = () => Math.random() > 0.5 ? null : { foo: 'bar' };
const defaultObj = { foo: 'foo' };

const obj = ifConst(nullOrObj(), truthyObj => {
  console.log('obj is truthy', truthyObj);

  // returned value is then returned from the `ifConst` itself
  return truthyObj;
}, falsyObj => {
  console.log('obj is falsy', falsyObj);

  // returned value is then returned from the `ifConst` itself
  return defaultObj;
});

// logs either
// > obj is truthy { foo: 'bar' }
// or
// > obj is falsy { foo: 'foo' }

console.log(obj);
// > { foo: 'bar' }
// or
// > { foo: 'foo' }
// depending on which conditional block was executed
```

The `ifConst` function is also curried, and can be called with the first argument only:
```ts
const ifObj = ifConst(nullOrObj);

// Basically the same deal as earlier
const obj = ifObj(truthyObj => {
  console.log('obj is truthy', truthyObj);

  // returned value is then returned from the `ifObj` itself
  return truthyObj;
}, falsyObj => {
  console.log('obj is falsy', falsyObj);

  // returned value is then returned from the `ifObj` itself
  return defaultObj;
});
```

But if, for some reason, you have to set the blocks first,\
you can use `constIf`:
```ts
import { constIf } from 'if-const';

const ifObj = constIf(truthyObj => {
  console.log('obj is truthy', truthyObj);

  // returned value is then returned from the resulting function
  return truthyObj;
}, falsyObj => {
  console.log('obj is falsy', falsyObj);

  // returned value is then returned from the resulting function
  return defaultObj;
});

// Basically the same deal as earlier
const obj = ifObj(nullOrObj);
```
This can be useful for piping and mapping different values in other functions.

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>
