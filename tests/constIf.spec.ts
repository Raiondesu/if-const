import { constIf } from '../src';
import { cases } from './cases';
import { callback, testRes } from './common';

const testConstIf =  (
  f: (f, elf?) => any,
  cond: string,
  ret: boolean,
  comp: (v: any) => boolean = _ => !!_
) => {
  const cb = callback(cond, ret, comp);

  testRes(cond, f(cb(true), cb(false))(cond), ret, false, comp);
  testRes(cond, f(cb(true))(cond), ret, true, comp);
};

describe('constIf', () => {
  it('is the same as ifConst, but in reverse', () => {
    for (const [cond, ret] of cases) {
      testConstIf(constIf, cond, ret);
    }
  });

  it('can use comparators', () => {
    for (const [cond, ret] of cases) {
      testConstIf(constIf.compare(() => true), cond, ret, () => true);
    }

    for (const [cond, ret] of cases) {
      testConstIf(constIf.not(false), cond, ret, _ => _ !== false);
    }
  });
});
