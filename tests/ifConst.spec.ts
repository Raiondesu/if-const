import { ifConst } from '../src';
import { cases } from './cases';
import { callback, testRes, TRUE_RES } from './common';

const test = (
  f: (f, elf?) => any,
  cond: string,
  ret: boolean,
  comp: (v: any) => boolean = _ => !!_
) => {
  const cb = callback(cond, ret, comp);

  testRes(cond, f(cb(true), cb(false)), ret, false, comp);
  testRes(cond, f(cb(true)), ret, true, comp);
};

describe('ifConst', () => {
  it('returns a proper conditioning function when one param is passed', () => {
    const f = ifConst(TRUE_RES);

    expect(typeof f).toBe('function');
  });

  it('executes correct blocks depending on condition', () => {
    for (const [cond, ret] of cases) {
      test(ifConst(cond), cond, ret);
    }
  });

  it('can use comparators', () => {
    for (const [cond, ret] of cases) {
      test(ifConst.compare(() => true)(cond), cond, ret, () => true);
    }

    for (const [cond, ret] of cases) {
      test(ifConst.not(false)(cond), cond, ret, _ => _ !== false);
    }
  });
});
