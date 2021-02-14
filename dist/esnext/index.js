import { ifConst } from "./if-const.js";
export * from "./if-const.js";
export default ifConst;
export function constIf(f, elf) {
    return cond => ifConst(cond, f, elf);
}
//# sourceMappingURL=index.js.map