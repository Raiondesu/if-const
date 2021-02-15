import { defaultComp, ifConst } from "./if-const.js";
function _constIf(f, elf) {
    return (value) => ifConst.compare(this.check)(value, f, elf);
}
export const constIf = _constIf.bind({ check: defaultComp });
constIf.compare = (c) => _constIf.bind({ check: c });
constIf.not = (value) => _constIf.bind({ check: _ => _ !== value });
//# sourceMappingURL=const-if.js.map