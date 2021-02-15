export const FALSE_RES = '';
export const TRUE_RES = 'true';
export const RETURN = 'result';

export const callback = (initCond: string, ret: boolean, comp: (v: any) => boolean) => (cond: boolean) => (r: string) => {
  expect(r).toBe(initCond);
  expect(comp(r)).toBe(comp(cond));

  if (ret) {
    return RETURN;
  }

  return r;
};

export const testRes = (value: string, result: any, returns: boolean, partial: boolean, comp: (v: any) => boolean) => {
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

export type TestFunc = (
  f: (f, elf?) => any,
  value: string,
  ret: boolean,
  comp?: (v: any) => boolean
) => void;
