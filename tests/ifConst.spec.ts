import { ifConst } from '../src';
import { cases } from './cases';
import { callback, TestFunc, testRes } from './common';

const test: TestFunc = (f, value, ret, comp = _ => !!_) => {
  const cb = callback(value, ret, comp);

  testRes(value, f(cb(true), cb(false)), ret, false, comp);
  testRes(value, f(cb(true)), ret, true, comp);
};

describe('ifConst', () => {
  it('returns a proper conditioning function when one param is passed', () => {
    const f = ifConst({});

    expect(typeof f).toBe('function');
  });

  it('executes correct blocks depending on condition', () => {
    for (const [value, ret] of cases) {
      test(ifConst(value), value, ret);
    }
  });

  it('can use comparators', () => {
    for (const [value, ret] of cases) {
      test(ifConst.compare(() => true)(value), value, ret, () => true);
    }

    for (const [value, ret] of cases) {
      test(ifConst.not(false)(value), value, ret, _ => _ !== false);
    }
  });
});
