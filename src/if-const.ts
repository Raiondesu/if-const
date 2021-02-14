export type Falsy = null | undefined | false | 0 | '';

export type F<T, R, U = Falsy> = (res: Exclude<T, U>) => R;
export type ELF<T, R, U = Falsy> = (res: Extract<T, U>) => R;

type FP<T, R> = [f?: F<T, R>, elf?: ELF<T, R>];

type FT<T, R> = (...args: FP<T, R>) => R | undefined;

type IfConst<U = Falsy> = {
  <T>(value: T): {
    <R>(f: F<T, R, U>): R | undefined
    <R>(f: F<T, R, U>, elf: ELF<T, R, U>): R;
  }
  <T, R>(value: T, f: F<T, R, U>): R | undefined;
  <T, R>(value: T, f: F<T, R, U>, elf: ELF<T, R, U>): R;
  <T, R>(value: T, f?: F<T, R, U>, elf?: ELF<T, R, U>): R | undefined;
}

type Comparator = (val: any) => boolean;

type CompThis = { check: Comparator };

const defaultComp: Comparator = (val: any) => !!val;

function _ifConst<T, R>(this: CompThis, cond: T, ...args: FP<T, R>): FT<T, R> | R | undefined {
  return args[0]
    ? (this.check(cond) ? args[0] : args[1])?.(cond as any)
    : _ifConst.bind(this, cond as unknown) as FT<T, R>;
}

export const ifConst: IfConst & {
  compare<U>(comparator: Comparator): IfConst<U>;
  not<U>(value: U): IfConst<U>;
} = _ifConst.bind({ check: defaultComp }) as any;

ifConst.compare = <U>(c: Comparator): IfConst<U> => {
  return _ifConst.bind({ check: c }) as any;
}
ifConst.not = <U>(value: U): IfConst<U> => {
  return _ifConst.bind({ check: (_: U) => _ !== value }) as any;
}
