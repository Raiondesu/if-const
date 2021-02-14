export function ifConst(cond, ...args) {
    return args[0]
        ? (cond ? args[0] : args[1])?.(cond)
        : (f, elf) => ifConst(cond, f, elf);
}
export default ifConst;
export function constIf(f, elf) {
    return cond => ifConst(cond, f, elf);
}
//# sourceMappingURL=index.js.map