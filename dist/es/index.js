export function ifConst(cond, ...args) {
    var _a;
    return args[0]
        ? (_a = (cond ? args[0] : args[1])) === null || _a === void 0 ? void 0 : _a(cond) : (f, elf) => ifConst(cond, f, elf);
}
export default ifConst;
export function constIf(f, elf) {
    return cond => ifConst(cond, f, elf);
}
//# sourceMappingURL=index.js.map