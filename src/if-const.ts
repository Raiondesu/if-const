export type Falsy = null | undefined | false | 0 | '';

export type F<T, R, U = Falsy> = (res: Exclude<T, U>) => R;
export type ELF<T, R, U = Falsy> = (res: Extract<T, U>) => R;

type FP<T, R> = [f?: F<T, R>, elf?: ELF<T, R>];

type FT<T, R> = (...args: FP<T, R>) => R | undefined;

type IfConst<U = Falsy> = {
  /**
   * Remembers the value to check later with a comparator
   *
   * @param value - the value to lazily check later
   * @returns a function that accepts two checking branches
   */
  <T>(value: T): {
    /**
     * Checks if the value is truthy for current comparator.
     * If it is, then the callback is executed.
     *
     * If a callback returns a value,
     * it will be passed on as the return value of the whole function.
     *
     * The function will return `undefined` otherwise.
     *
     * @param f - a callback to execute if comparator yields true
     * @returns value returned from f, or `undefined`
     */
    <R>(f: F<T, R, U>): R | undefined
    /**
     * Checks if the value is truthy for current comporator.
     * One of the two callbacks is executed based on the result.
     *
     * If a callback returns a value,
     * it will be passed on as the return value of the whole function.
     *
     * @param f - a callback to execute if comparator yields true
     * @param elf - a callback to execute if comparator yields false
     * @returns value returned from f or elf
     */
    <R>(f: F<T, R, U>, elf: ELF<T, R, U>): R;
  }
  /**
   * Checks if the value is truthy for current comparator.
   * If it is, then the callback is executed.
   *
   * If a callback returns a value,
   * it will be passed on as the return value of the whole function.
   *
   * The function will return `undefined` otherwise.
   *
   * @param value - the value to check against the comparator
   * @param f - a callback to execute if comparator yields true
   * @returns value returned from f, or `undefined`
   */
  <T, R>(value: T, f: F<T, R, U>): R | undefined;
  /**
   * Checks if the value is truthy for current comporator.
   * One of the two callbacks is executed based on the result.
   *
   * If a callback returns a value,
   * it will be passed on as the return value of the whole function.
   *
   * @param value - the value to check against the comparator
   * @param f - a callback to execute if comparator yields true
   * @param elf - a callback to execute if comparator yields false
   * @returns value returned from f or elf
   */
  <T, R>(value: T, f: F<T, R, U>, elf: ELF<T, R, U>): R;
  <T, R>(value: T, f?: F<T, R, U>, elf?: ELF<T, R, U>): R | undefined;
}

export type Comparator = (val: any) => boolean;

export type CompThis = { check: Comparator };

export const defaultComp: Comparator = (val: any) => !!val;

function _ifConst<T, R>(this: CompThis, cond: T, ...args: FP<T, R>): FT<T, R> | R | undefined {
  return args[0]
    ? (this.check(cond) ? args[0] : args[1])?.(cond as any)
    : _ifConst.bind(this, cond as unknown) as FT<T, R>;
}

export const ifConst: IfConst & {
  /**
   * Changes the default comparator
   * to one that checks if the input is not equal (`!==`)
   * to the passed value.
   *
   * Serves as a way to type-safely inject a new comparator into the `ifConst` function.
   *
   * @param value - the value to negatively check against
   * @returns IfConst - with the new comparator in-place
   */
  not<U>(value: U): IfConst<U>;

  /**
   * Changes the default comparator
   * to one that checks if the passed function yields true
   * for the current input.
   *
   * Serves as a way to type-safely inject a new comparator into the `ifConst` function.
   *
   * @param comparator - the function to use as a new comparator
   * @returns IfConst - with the new comparator in-place
   */
  compare<U>(comparator: Comparator): IfConst<U>;
} = _ifConst.bind({ check: defaultComp }) as any;

ifConst.compare = <U>(c: Comparator): IfConst<U> => _ifConst.bind({ check: c }) as any;
ifConst.not = <U>(value: U): IfConst<U> => _ifConst.bind({ check: _ => _ !== value }) as any;
