const defaultComp = (val) => !!val;
function _ifConst(cond, ...args) {
    var _a;
    return args[0]
        ? (_a = (this.check(cond) ? args[0] : args[1])) === null || _a === void 0 ? void 0 : _a(cond) : _ifConst.bind(this, cond);
}
export const ifConst = _ifConst.bind({ check: defaultComp });
ifConst.compare = (c) => {
    return _ifConst.bind({ check: c });
};
ifConst.not = (value) => {
    return _ifConst.bind({ check: (_) => _ !== value });
};
export default ifConst;
export function constIf(f, elf) {
    return cond => ifConst(cond, f, elf);
}
//# sourceMappingURL=index.js.map