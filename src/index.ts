export type Falsy = null | undefined | false | 0 | '';

export type F<T, R> = (res: Exclude<T, Falsy>) => R;
export type ELF<T, R> = (res: Extract<T, Falsy>) => R;

type FP<T, R> = [f?: F<T, R>, elf?: ELF<T, R>];

type FT<T, R> = (...args: FP<T, R>) => R | undefined;

export function ifConst<T>(cond: T): {
  <R>(f: F<T, R>): R | undefined
  <R>(f: F<T, R>, elf: ELF<T, R>): R;
}
export function ifConst<T, R>(cond: T, f: F<T, R>): R | undefined;
export function ifConst<T, R>(cond: T, f: F<T, R>, elf: ELF<T, R>): R;
export function ifConst<T, R>(cond: T, f?: F<T, R>, elf?: ELF<T, R>): R | undefined;
export function ifConst<T, R = never>(cond: T, ...args: FP<T, R>): R | undefined | FT<T, R> {
  return args[0]
    ? (cond ? args[0] : args[1])?.(cond as any)
    : (f, elf) => ifConst(cond, f, elf);
}

export default ifConst;

export function constIf<T, R>(f: F<T, R>): (cond: T) => R | undefined;
export function constIf<T, R>(f: F<T, R>, elf: ELF<T, R>): (cond: T) => R;
export function constIf<T, R>(f: F<T, R>, elf?: ELF<T, R>): (cond: T) => R | undefined;
export function constIf<T, R>(f: F<T, R>, elf?: ELF<T, R>): (cond: T) => R | undefined {
  return cond => ifConst(cond, f, elf);
}
