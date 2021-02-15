"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifConst = exports.defaultComp = void 0;
const defaultComp = (val) => !!val;
exports.defaultComp = defaultComp;
function _ifConst(cond, ...args) {
    var _a;
    return args[0]
        ? (_a = (this.check(cond) ? args[0] : args[1])) === null || _a === void 0 ? void 0 : _a(cond) : _ifConst.bind(this, cond);
}
exports.ifConst = _ifConst.bind({ check: exports.defaultComp });
exports.ifConst.compare = (c) => _ifConst.bind({ check: c });
exports.ifConst.not = (value) => _ifConst.bind({ check: _ => _ !== value });
//# sourceMappingURL=if-const.js.map