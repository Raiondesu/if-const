"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constIf = void 0;
const if_const_1 = require("./if-const");
__exportStar(require("./if-const"), exports);
exports.default = if_const_1.ifConst;
function constIf(f, elf) {
    return cond => if_const_1.ifConst(cond, f, elf);
}
exports.constIf = constIf;
//# sourceMappingURL=index.js.map