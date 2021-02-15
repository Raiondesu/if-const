"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constIf = void 0;
const if_const_1 = require("./if-const");
function _constIf(f, elf) {
    return (value) => if_const_1.ifConst.compare(this.check)(value, f, elf);
}
exports.constIf = _constIf.bind({ check: if_const_1.defaultComp });
exports.constIf.compare = (c) => _constIf.bind({ check: c });
exports.constIf.not = (value) => _constIf.bind({ check: _ => _ !== value });
//# sourceMappingURL=const-if.js.map