import { ifConst, F, ELF } from './if-const';

export * from './if-const';

export default ifConst;

export function constIf<T, R>(f: F<T, R>): (cond: T) => R | undefined;
export function constIf<T, R>(f: F<T, R>, elf: ELF<T, R>): (cond: T) => R;
export function constIf<T, R>(f: F<T, R>, elf?: ELF<T, R>): (cond: T) => R | undefined;
export function constIf<T, R>(f: F<T, R>, elf?: ELF<T, R>): (cond: T) => R | undefined {
  return cond => ifConst(cond, f, elf);
}
