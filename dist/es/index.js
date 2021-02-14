export function ifConst(cond, ...args) {
    var _a;
    return args[0]
        ? (_a = (cond ? args[0] : args[1])) === null || _a === void 0 ? void 0 : _a(cond) : (f, elf) => ifConst(cond, f, elf);
}
export default ifConst;
//# sourceMappingURL=index.js.map