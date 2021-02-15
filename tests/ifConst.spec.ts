import { ifConst, constIf } from '../src';

const FALSE_RES = '';
const TRUE_RES = 'true';
const RETURN = 'result';
const cases = [
  [TRUE_RES, true],
  [FALSE_RES, true],
  [TRUE_RES, false],
  [FALSE_RES, false],
] as const;

const callback = (initCond: string, ret: boolean, comp: (v: any) => boolean) => (cond: boolean) => (r: string) => {
  expect(r).toBe(initCond);
  expect(comp(r)).toBe(comp(cond));

  if (ret) {
    return RETURN;
  }

  return r;
};

const testRes = (value: string, result: any, returns: boolean, partial: boolean, comp: (v: any) => boolean) => {
  if (!partial) {
    expect(result).toBe(returns ? RETURN : value);

    return;
  }

  if (!returns) {
    expect(result).toBe(comp(value) ? value : undefined);

    return;
  }


  if (comp(value)) {
    expect(result).toBe(RETURN);
  } else {
    expect(result).toBeUndefined();
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
  ret: boolean,
  comp: (v: any) => boolean = _ => !!_
) => {
  const cb = callback(cond, ret, comp);

  testRes(cond, f(cb(true), cb(false))(cond), ret, false, comp);
  testRes(cond, f(cb(true))(cond), ret, true, comp);
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
