import { CompThis, Comparator, defaultComp, F, ELF, Falsy, ifConst } from './if-const';

function _constIf<T, R>(this: CompThis, f: F<T, R>, elf?: ELF<T, R>) {
  return (value: T) => ifConst.compare(this.check)(value, f as any, elf as any) as R | undefined;
}

type ConstIf<U> = {
  <T, R>(f: F<T, R, U>): (value: T) => R | undefined;
  <T, R>(f: F<T, R, U>, elf: ELF<T, R, U>): (value: T) => R;
  <T, R>(f: F<T, R, U>, elf?: ELF<T, R, U>): (value: T) => R | undefined;
};

export const constIf: ConstIf<Falsy> & {
  /**
   * Changes the default comparator
   * to one that checks if the input is not equal (`!==`)
   * to the passed value.
   *
   * Serves as a way to type-safely inject a new comparator into the `constIf` function.
   *
   * @param value - the value to negatively check against
   * @returns constIf - with the new comparator in-place
   */
  not<U>(value: U): ConstIf<U>;

  /**
   * Changes the default comparator
   * to one that checks if the passed function yields true
   * for the current input.
   *
   * Serves as a way to type-safely inject a new comparator into the `constIf` function.
   *
   * @param comparator - the function to use as a new comparator
   * @returns constIf - with the new comparator in-place
   */
  compare<U>(comparator: Comparator): ConstIf<U>;
} = _constIf.bind({ check: defaultComp }) as any;

constIf.compare = <U>(c: Comparator): ConstIf<U> => _constIf.bind({ check: c }) as any;
constIf.not = <U>(value: U): ConstIf<U> => _constIf.bind({ check: _ => _ !== value }) as any;
