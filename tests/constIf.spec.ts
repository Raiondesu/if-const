import { constIf } from '../src';
import { cases } from './cases';
import { callback, TestFunc, testRes } from './common';

const testConstIf: TestFunc = (f, value, ret, comp = _ => !!_) => {
  const cb = callback(value, ret, comp);

  testRes(value, f(cb(true), cb(false))(value), ret, false, comp);
  testRes(value, f(cb(true))(value), ret, true, comp);
};

describe('constIf', () => {
  it('is the same as ifConst, but in reverse', () => {
    for (const [value, ret] of cases) {
      testConstIf(constIf, value, ret);
    }
  });

  it('can use comparators', () => {
    for (const [value, ret] of cases) {
      testConstIf(constIf.compare(() => true), value, ret, () => true);
    }

    for (const [value, ret] of cases) {
      testConstIf(constIf.not(false), value, ret, _ => _ !== false);
    }
  });
});
