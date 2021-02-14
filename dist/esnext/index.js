export function ifConst(cond, ...args) {
    return args[0]
        ? (cond ? args[0] : args[1])?.(cond)
        : (f, elf) => ifConst(cond, f, elf);
}
export default ifConst;
//# sourceMappingURL=index.js.map