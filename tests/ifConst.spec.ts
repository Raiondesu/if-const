import { ifConst } from '../dist/js';
import { FP } from '../src';

const FALSE: boolean = false;
const TRUE: boolean = true;
const RETURN: string = 'result';
const callback = (initCond: boolean, ret: boolean) => (cond: boolean) => r => {
  expect(r).toBe(initCond);
  expect(r).toBe(cond);

  if (ret) {
    return RETURN;
  }

  return r;
};

const testRes = (cond: any, res: any, ret: boolean, part: boolean) => {
  if (!part) {
    expect(res).toBe(ret ? RETURN : cond);

    return;
  }

  if (!ret) {
    expect(res).toBe(cond || undefined);

    return;
  }

  if (cond) {
    expect(res).toBe(RETURN);
  } else {
    expect(res).toBeUndefined();
  }
};

const test = (
  f: (...args: FP<boolean, string | boolean | undefined>) => boolean | string | undefined,
  cond: boolean,
  ret: boolean
) => {
  const cb = callback(cond, ret);

  testRes(cond, f(cb(true), cb(false)), ret, false);
  testRes(cond, f(cb(true)), ret, true);
};

describe('ifConst', () => {
  it('returns a proper conditioning function when one param is passed', () => {
    const f = ifConst(TRUE);

    expect(typeof f).toBe('function');
    expect(f.length).toBe(2);
  });

  it('executes correct blocks depending on condition', () => {
    const params = [
      [TRUE, true],
      [FALSE, true],
      [TRUE, false],
      [FALSE, false],
    ] as const;

    for (const [cond, ret] of params) {
      test(ifConst(cond), cond, ret);
    }
  });
});
