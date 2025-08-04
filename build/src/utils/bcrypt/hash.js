"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHash = exports.compareHash = exports.generateHash = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
const salt = (0, bcrypt_1.genSaltSync)(saltRounds);
function generateHash(stringToHash) {
    const hash = (0, bcrypt_1.hashSync)(stringToHash, salt);
    return hash;
}
exports.generateHash = generateHash;
;
const compareHash = (passToCompare, hashToCompare) => {
    return (0, bcrypt_1.compareSync)(passToCompare, hashToCompare);
};
exports.compareHash = compareHash;
const isHash = (testHash) => {
    const match = /^\$2[ayb]\$.{56}$/;
    return match.test(testHash);
};
exports.isHash = isHash;
//# sourceMappingURL=hash.js.map