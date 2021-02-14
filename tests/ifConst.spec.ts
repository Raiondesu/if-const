import { ifConst, constIf } from '../src';

const FALSE_RES = '';
const TRUE_RES = 'true';
const RETURN: string = 'result';
const cases = [
  [TRUE_RES, true],
  [FALSE_RES, true],
  [TRUE_RES, false],
  [FALSE_RES, false],
] as const;

const callback = (initCond: string, ret: boolean, comp: (v: any) => boolean) => (cond: boolean) => (r: string) => {
  expect(r).toBe(initCond);
  expect(comp(r)).toBe(cond);

  if (ret) {
    return RETURN;
  }

  return r;
};

const testRes = (cond: string, res: any, ret: boolean, part: boolean, comp: (v: any) => boolean) => {
  if (!part) {
    expect(res).toBe(ret ? RETURN : cond);

    return;
  }

  if (!ret) {
    expect(res).toBe(comp(false) === true ? cond : (cond || undefined));

    return;
  }

  if (cond || comp(false) === true) {
    expect(res).toBe(RETURN);
  } else if (comp(false) === false) {
    expect(res).toBeUndefined();
  }
};

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

const testConstIf =  (
  f: (f, elf?) => any,
  cond: string,
  ret: boolean
) => {
  const cb = callback(cond, ret, _ => !!_);

  testRes(cond, f(cb(true), cb(false))(cond), ret, false, _ => !!_);
  testRes(cond, f(cb(true))(cond), ret, true, _ => !!_);
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
    const comp = () => true;
    for (const [cond, ret] of cases) {
      test(ifConst.compare(comp)(cond), cond, ret, comp);
    }

    for (const [cond, ret] of cases) {
      test(ifConst.not(false)(cond), cond, ret, comp);
    }
  });
});

describe('constIf', () => {
  it('is the same as ifConst, but in reverse', () => {
    for (const [cond, ret] of cases) {
      testConstIf(constIf, cond, ret);
    }
  });
});
