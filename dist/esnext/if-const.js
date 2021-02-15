export const defaultComp = (val) => !!val;
function _ifConst(cond, ...args) {
    return args[0]
        ? (this.check(cond) ? args[0] : args[1])?.(cond)
        : _ifConst.bind(this, cond);
}
export const ifConst = _ifConst.bind({ check: defaultComp });
ifConst.compare = (c) => _ifConst.bind({ check: c });
ifConst.not = (value) => _ifConst.bind({ check: _ => _ !== value });
//# sourceMappingURL=if-const.js.map