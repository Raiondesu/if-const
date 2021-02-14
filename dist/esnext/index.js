const defaultComp = (val) => !!val;
function _ifConst(cond, ...args) {
    return args[0]
        ? (this.check(cond) ? args[0] : args[1])?.(cond)
        : _ifConst.bind(this, cond);
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