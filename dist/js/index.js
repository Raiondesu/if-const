"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifConst = void 0;
function ifConst(cond, ...args) {
    var _a;
    return args[0]
        ? (_a = (cond ? args[0] : args[1])) === null || _a === void 0 ? void 0 : _a(cond) : (f, elf) => ifConst(cond, f, elf);
}
exports.ifConst = ifConst;
exports.default = ifConst;
//# sourceMappingURL=index.js.map