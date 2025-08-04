"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const recoveryPasswordKey = process.env.RECOVERY_PASSWORD_KEY;
const options = { algorithm: "HS256", expiresIn: "8h" };
const generate_token = (user) => {
    return (0, jsonwebtoken_1.sign)(user, secretKey, options);
};
const generate_token_recovery_password = (user) => {
    return (0, jsonwebtoken_1.sign)(user, recoveryPasswordKey, options);
};
const verify_token = (token) => {
    try {
        const verifed = (0, jsonwebtoken_1.verify)(token, recoveryPasswordKey, options);
        return verifed;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.default = {
    generate_token,
    verify_token,
    generate_token_recovery_password,
};
//# sourceMappingURL=jsonWebToken.js.map